"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Inserire username"),
  password: z.string().min(20, "Inserire password").max(25),
});

async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 5);
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("session_token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function loginAction(
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const usernameRow = formData.get("username") as string;
  const passwordRow = formData.get("password") as string;

  try {
    const validatedData = loginSchema.safeParse({
      username: usernameRow,
      password: passwordRow,
    });

    if (!validatedData.success)
      return { success: false, message: validatedData.error.issues[0].message };

    const { username, password } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return { success: false, message: "Credenziali non valide" };

    await prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });

    await createSession(user.id);
    return { success: true, message: "Login effettuato" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Errore sconosciuto",
    };
  }
}

export async function getSession(): Promise<Prisma.SessionGetPayload<{
  select: {
    token: true;
    userId: true;
    expiresAt: true;
    id: true;
    createdAt: true;
  };
  include: {
    user: true;
  };
}> | null> {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: {
      token: token,
    },
    include: {
      user: true,
    },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) return null;

  return session;
}

export async function requireAuth(): Promise<
  Prisma.SessionGetPayload<{
    select: {
      token: true;
      userId: true;
      expiresAt: true;
      id: true;
      createdAt: true;
    };
    include: {
      user: true;
    };
  }>
> {
  const session = await getSession();

  if (!session) redirect("/");

  return session;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return;

  try {
    await prisma.session.deleteMany({
      where: {
        token: token,
      },
    });
  } catch (error) {
    console.error("Logout error: ", error);
  }

  cookieStore.delete("session_token");

  redirect("/");
}

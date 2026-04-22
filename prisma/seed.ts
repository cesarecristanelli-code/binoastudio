import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
  const email = process.env.ADMIN_EMAIL!;

  await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {
      password: password,
    },
    create: {
      email: email,
      password: password,
      username: "admin",
    },
  });
}

main()
  .then(() => {
    console.log("Admin inserito con successo");
  })
  .catch((e) => {
    console.error("Errore nell'inserimento dell'admin: ", e);
  })
  .finally(() => prisma.$disconnect());

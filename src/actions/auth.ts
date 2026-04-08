import { prisma } from "@/lib/prisma";



export default async function loginAction(formData: FormData) {
    try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if(!username) throw new Error("Username non valido");
        if(!password) throw new Error("Password non valida");

        const user = await prisma.user.findUnique({
            where: {username: username},
        });

        if(!user || user.password !== password) {
            return {success: false, message: "Credenziali non valide"}
        }

        return {success: true, message: "Login effettuato"}
    } catch {
        return {success: false, message: "Errore nel database"}
    }
}
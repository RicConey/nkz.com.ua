import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash } from "crypto";

// Функція для обчислення SHA‑256 хешу
function hashPassword(password) {
    return createHash("sha256").update(password).digest("hex");
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Зчитування даних з оточення
                const adminUsername = process.env.ADMIN_USERNAME;
                const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

                if (!adminUsername || !storedPasswordHash) {
                    throw new Error("Server misconfiguration: credentials not set.");
                }

                // Порівнюємо username
                if (credentials.username !== adminUsername) {
                    return null;
                }

                // Обчислюємо хеш введеного пароля
                const providedHash = hashPassword(credentials.password);
                if (providedHash !== storedPasswordHash) {
                    return null;
                }

                // Якщо все гаразд, повертаємо об'єкт користувача
                return { id: 1, name: "Admin", email: "admin@example.com" };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/admin/auth/signin",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

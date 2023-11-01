import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, role_id, password } = credentials as {username: string,role_id:string, password: string};
                const user: any = await prisma.user.findUnique({where: {username, role_id}}); 
                if (!user) {
                    return null;
                } 
                const confirmPassword = await bcrypt.compare(password, user.password);
                if(!confirmPassword) {
                    return null;
                }
                return user;
                }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }:any) => {
            if (user) {
                token.username = user.username;
            }
            return token;
        },
        session: async ({ session, token }:any) => {
            if (token) {
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
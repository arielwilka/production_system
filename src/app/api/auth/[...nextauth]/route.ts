import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
// import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

type User = {
    user_id: string;
    name: string;
    gender: string;
    username: string;
    password: string;
    is_enable: boolean;
    role_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    role: {
        name: string
    }
}

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
                const { username, role, password } = credentials as { username: User["username"], role: User["role"], password: User["password"] };
                const user: any = await prisma.user.findUnique({
                    where: {username,role},
                    include: {
                        role:{
                            select:{
                                name: true
                            }
                        }
                    }
                }); 
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
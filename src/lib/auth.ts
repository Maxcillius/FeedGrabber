import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { SessionStrategy } from "next-auth";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
    adapter: PrismaAdapter(db) as Adapter,
    session: {
        strategy: 'jwt' as SessionStrategy,
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        allowDangerousEmailAccountLinking: true,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user}: {token: any, user: any}) {
            if(user) {
                return {
                    ...token,
                    uid: token.sub
                };
            }

            return token;
        },
        async session({session, token}: {session: any, token: any}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    uid: token.uid as string
                }
            }
        }
    },
    // pages: {
    //     signIn: '/auth/signin'
    // }
}
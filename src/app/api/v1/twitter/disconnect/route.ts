import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authConfig);
    if(!session) return NextResponse.json({
        message: "Not Authorized"
    }, 
        {
            status: 401
        }
    )

    try {
        const uid: string = session.user.uid;

        const response = await db.socialAccount.findFirst({
            where: {
                userId: uid,
                platform: 'twitter'
            }
        })
    
        const del = await db.socialAccount.delete({
            where: {
                id: response?.id
            }
        })

        return NextResponse.json({
            message: "Account disconnected successfully"
        })
    } catch(error) {
        console.log(error);
        return NextResponse.json({
            message: "error occurred"
        })
    }
}
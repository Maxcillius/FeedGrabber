import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authConfig);

    if(!session) return NextResponse.json({
        message: "Not Authorized"
    }, 
        {
            status: 401
        }
    )

    const uid = session.user.uid;

    const response = await db.socialAccount.findMany({
        where: {
            userId: uid
        }
    })

    const accounts = response.map((data) => {
        return data.platform
    })

    return NextResponse.json({
        accounts: accounts
    })
}
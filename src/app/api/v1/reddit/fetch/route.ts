import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import RefreshToken from "@/lib/refreshToken";

export async function GET() {

    const sesssion = await getServerSession(authConfig);

    if(!sesssion) return NextResponse.json({
        message: "Not Authorized"
    }, 
        {
            status: 401
        }
    )

    try {
        
        const data = await db.socialAccount.findFirst({
            where: {
                userId: sesssion.user.uid,
                platform: 'reddit',
            }
        })

        if(!data) return NextResponse.json({
            message: "Reddit account not linked"
        }, 
            {
                status: 404
            }
        )

        const expiration_time = data.token_expiration;
        let accessToken = data.accessToken;
        const refresh_token = data.refreshToken

        const currentTime = Date.now();

        if (currentTime < expiration_time && refresh_token) {
            accessToken = await RefreshToken(refresh_token);
        }

        // const body = await req.json();
        // const format = body.format;

        const response = await axios.get(`https://oauth.reddit.com/hot`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'FeedGrabber'
        }
        });


        return NextResponse.json(response.data);

    } catch (error) {
            console.log(error);
            return NextResponse.json({
                error: error
            })
    }
}
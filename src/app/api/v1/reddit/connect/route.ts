import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import axios from "axios";
require('dotenv').config()

export async function POST(req: NextRequest) {

    const sesssion = await getServerSession(authConfig);
    if(!sesssion) {
        return NextResponse.json({
            message: "Not Authorized"
        }, 
            {
                status: 401
            }
        )
    }

    try {
        const id = 'yvLf91cRahhGeDh2NC3tkg';
        const secret = 'ih3cLWlym5cNieuQlcO3YgwHk5o6wQ';
        const redirect_uri = 'http://localhost:3000/callback/reddit';
    
        const body = await req.json();
        const code = body.code;
    
        const redditResponse = await axios.post('https://www.reddit.com/api/v1/access_token', {
            grant_type: 'authorization_code',
            code,
            redirect_uri,
          }, {
            auth: {
              username: id,
              password: secret
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
    
        const { access_token, refresh_token, expires_in } = redditResponse.data;
        const userId = sesssion.user.uid;
    

        const response = await db.socialAccount.create({
            data: {
                platform: 'reddit',
                accessToken: access_token,
                refreshToken: refresh_token,
                userId: userId,
                token_expiration: Date.now() + expires_in * 1000
              },
        })

        return NextResponse.json(response);


    } catch(error) {
        return NextResponse.json({
            message: "Some error occurred"
        });
    }
}
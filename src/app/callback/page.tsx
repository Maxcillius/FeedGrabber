'use client'

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function Callback() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');

    const redditAuth = async () => {
        try {

            const response = await axios.post('/api/v1/reddit/connect', {
                code
            })

            router.push("/settings");
            
        } catch(error) {
            console.log(error);
        }
    }

    redditAuth();

    return (
        <div className="flex flex-row justify-center h-screen pt-16">
            <div className="flex flex-col justify-center">
                <div className="flex flex-col md:flex-row justify-center gap-5">
                    <h1 className="text-5xl text-white">Connecting</h1>
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    )
}
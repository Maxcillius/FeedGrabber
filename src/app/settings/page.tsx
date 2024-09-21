'use client'

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import IsAuth from "@/lib/isauth"

export default function Settings() {

    const [ reddit, setReddit ] = useState(false);
    const [ twitter, setTwitter ] = useState(false);
    const [ instagram, setInstagram ] = useState(false);

    const router = useRouter();
    const { data: session, status } = useSession();

    const name = session?.user?.name;
    const email = session?.user?.email;

    const isConnected = useCallback(async () => {
        const { data } = await axios.get('/api/v1/connected');
        data.accounts.map((data: any) => {
            if(data === 'reddit') setReddit(true);
            else if(data === 'twitter') setTwitter(true);
            else if(data === 'instagram') setInstagram(true);
        })
    }, [])


    if(status === 'unauthenticated') router.push('/');

    useEffect(() => {
        isConnected();
    }, [])

    const connect = async () => {
        const client_id = 'yvLf91cRahhGeDh2NC3tkg';
        const redirect_uri = 'http://localhost:3000/callback/reddit';
        const state = Math.random().toString(36).substring(2);

        window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=read`;

    }

    const disconnect = async () => {
        try {
            await axios('/api/v1/reddit/disconnect');

            setReddit(false);
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-row justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-6 ">
                        <h5 className="text-xl pl-2 font-medium text-gray-900 dark:text-white">Profile</h5>
                        <div>
                            <label className="block mb-2 pl-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <p className="py-2 bg-slate-500 text-center rounded-2xl text-gray-800">{name}</p>
                        </div>
                        <div>
                        <label className="block mb-2 pl-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <p className="py-2 bg-slate-500 text-center rounded-2xl text-gray-800">{email}</p>
                        </div>
                        <div className="w-full flex flex-row justify-center gap-10">
                            <button onClick={reddit ? disconnect : connect} className={`w-96 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${ reddit ? 'bg-orange-700 hover:bg-orange-800 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800' : 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800'}`}>Reddit</button>
                        </div>
                        <div className="w-full flex flex-row justify-center gap-10">
                            <button className={`w-96 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${ twitter ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800'}`}>Twitter</button>
                        </div>
                        <div className="w-full flex flex-row justify-center gap-10">
                            <button className={`w-96 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${ instagram ? 'bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800' : 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800'}`}>Instagram</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
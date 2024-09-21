'use client'

import Card from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios";
import { RedditPost } from "@/types/redditPost";
import CardSkeleton from "@/components/ui/CardSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import { useSession } from "next-auth/react";

export default function Feeds() {
    const [ redditFeeds, setRedditFeeds ] = useState<RedditPost[]>([]);
    const [ accountConnected, setAccountConnected ] = useState(false);
    const [ checking, setChecking ] = useState(true);
    const [ isloading, setLoading ] = useState(true);

    const { data: session, status } = useSession();

    useEffect(() => {

        const redditConnected = async () => {
            try {
                const response = await axios.get('/api/v1/connected');

                response.data.accounts.forEach((data: string) => {
                    if(data === 'reddit' || data === 'twitter' || data === 'instagram') {
                        setAccountConnected(true);
                    }
                })

                if(accountConnected) data();

                setChecking(false);

            } catch(error) {
                setChecking(false);
            }
            
        }

        redditConnected();

        const data = async () => {
            try {
                const response = await axios.get('/api/v1/reddit/fetch');

                const posts = response.data.data.children.map((info: any) => ({
                    id: info.data.id,
                    permalink: 'https://www.reddit.com' + info.data.permalink,
                    subreddit: info.data.subreddit,
                    thumbnail: info.data.thumbnail,
                    thumbnail_height: info.data.thumbnail_height,
                    thumbnail_width: info.data.thumbnail_width,
                    title: info.data.title,
                    upvote: info.data.ups
                }));

                setRedditFeeds(posts);

                setTimeout(() => {
                    setLoading(false);
                }, 1000)
    
            } catch(error) {
                console.log(error);
            }
        }

    }, [])

    return (
        <div>
            <div className="mt-40">
                {   !isloading && status === 'authenticated' &&
                    <div className="flex flex-col justify-center">
                        {   accountConnected &&
                            <div>
                                <h1 className="text-5xl text-white font-bold text-center p-5">Reddit</h1>
                                <div className={`${accountConnected ? '' : 'collapse hidden'} flex flex-wrap flex-row justify-evenly gap-10`}>
                                    {   
                                        <Card posts={redditFeeds}/>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    isloading && status === 'authenticated' &&
                    <div className="mt-40 flex flex-col justify-center">
                        <div>
                            <div className={`${accountConnected ? '' : 'collapse hidden'} flex flex-row justify-center`}>
                                <TitleSkeleton />
                            </div>
                            <div className={`${accountConnected ? '' : 'collapse hidden'} flex flex-wrap flex-row justify-evenly gap-10`}>
                                {   
                                    <div className='grid lg:grid-cols-4 md:auto-rows-auto gap-10 grid-cols-1'>
                                        <div className="">
                                            <CardSkeleton />
                                        </div>
                                        <CardSkeleton />
                                        <CardSkeleton />
                                        <CardSkeleton />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    checking &&
                    <div className="flex flex-row justify-center">
                        <div className="loader"></div>
                    </div>
                }
                {
                    !accountConnected && !checking && status === 'authenticated' &&
                    <div className="flex flex-row justify-center">
                        <h1 className="text-white text-xl font-bold">Connect any account to view posts</h1>
                    </div>
                }
                {
                    status === 'unauthenticated' && !checking &&
                    <div className="flex flex-row justify-center">
                        <h1 className="text-white text-xl font-bold">Create an account to continue</h1>
                    </div>
                }
            </div>
        </div>
    )
}
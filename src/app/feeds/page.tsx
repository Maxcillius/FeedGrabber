'use client'

import Card from "@/components/ui/card"
import { useEffect, useState, useCallback } from "react"
import axios from "axios";
import { RedditPost } from "@/types/redditPost";
import CardSkeleton from "@/components/ui/CardSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import { useSession } from "next-auth/react";

export default function Feeds() {
    const [redditFeeds, setRedditFeeds] = useState<RedditPost[]>([]);
    const [accountConnected, setAccountConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [checking, setChecking] = useState(true);
    const { data: session, status } = useSession();
  
    const fetchAccountStatus = useCallback(async () => {
      try {
        const { data } = await axios.get('/api/v1/connected');
        const isConnected = data.accounts.some((account: string) => 
          ['reddit', 'twitter', 'instagram'].includes(account)
        );
        setAccountConnected(isConnected);
        return isConnected;
      } catch (error) {
        console.error('Error checking account status:', error);
        return false;
      }
    }, []);
  
    const fetchRedditPosts = useCallback(async () => {
      try {
        const { data } = await axios.get('/api/v1/reddit/fetch');
        const posts: RedditPost[] = data.data.children.map((info: any) => ({
          id: info.data.id,
          permalink: `https://www.reddit.com${info.data.permalink}`,
          subreddit: info.data.subreddit,
          thumbnail: info.data.thumbnail,
          thumbnail_height: info.data.thumbnail_height,
          thumbnail_width: info.data.thumbnail_width,
          title: info.data.title,
          upvote: info.data.ups
        }));
        setRedditFeeds(posts);
      } catch (error) {
        console.error('Error fetching Reddit posts:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      const initializeFeed = async () => {
        const isConnected = await fetchAccountStatus();
        setChecking(false);
        if (isConnected) {
          await fetchRedditPosts();
        } else {
          setIsLoading(false);
        }
      };
  
      initializeFeed();
    }, []);

    return (
        <div>
            <div className="mt-40">
                {   !isLoading && status === 'authenticated' &&
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
                    isLoading && status === 'authenticated' &&
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
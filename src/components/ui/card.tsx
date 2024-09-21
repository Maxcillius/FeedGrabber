import { useState } from 'react';
import { RedditPost } from "@/types/redditPost";
import Image from "next/image";
import Link from 'next/link';

export default function RedditFeed({ posts }: { posts: RedditPost[] }) {
    const [visiblePosts, setVisiblePosts] = useState(4);

    const handleShowMore = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
    };

    return (
        <div className='grid lg:grid-cols-4 md:auto-rows-auto gap-10 grid-cols-1'>
            {posts.slice(0, visiblePosts).map((post) => (
                <div key={post.id} className="max-w-sm bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 my-4">
                    <div className="flex flex-col items-center p-5">
                        {post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail && (
                            <Image className="rounded-lg mb-5" src={post.thumbnail} height={post.thumbnail_height} width={300} alt="thumbnail" />
                        )}
                        <div className="text-center space-y-4">
                            <Link href={post.permalink} target='_blank' className='flex flex-col justify-center gap-5'>
                                <h3 className="text-lg lg:text-2xl font-bold text-blue-400 transition-all duration-200">
                                    {post.subreddit}
                                </h3>
                                <h5 className="text-lg lg:text-xl text-slate-200 tracking-wide hover:text-blue-400 transition-all duration-200">
                                    {post.title}
                                </h5>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            {visiblePosts < posts.length && (
                <div className="text-center">
                    <button 
                        onClick={handleShowMore} 
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}

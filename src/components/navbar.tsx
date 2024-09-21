'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [ isdown, setdown ] = useState(false);

    return (
        <nav className="bg-white fixed dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="flex flex-wrap justify-between mx-auto p-4 w-full">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" height={100} width={50}/>
                </a>
                <div className="flex order-2 space-x-0 rtl:space-x-reverse">
                    {
                        status === 'unauthenticated' &&
                        <button onClick={() => {signIn('google')}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                    }
                    <div>
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" onClick={() => {setdown(!isdown)}} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                {
                                    status === 'authenticated' && session.user != null &&
                                    <div className="">
                                        <Image className="w-8 h-8 rounded-full" src={session.user.image as string} alt="user photo" height={100} width={100}/>
                                    </div>
                                }
                            </button>
                            <div className={`z-50 ${!isdown ? "hidden" : ""} absolute right-0 mt-60 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown"> 
                                <div className="px-4 py-3">
                                    {   status === 'authenticated' && session.user != null &&
                                        <>
                                            <span className="block text-sm text-gray-900 dark:text-white">{session.user?.name}</span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{session.user?.email}</span>
                                        </>
                                    }
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a   href="#" onClick={() => {signOut()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-center justify-start md:flex w-auto order-1" id="navbar-user">
                    <ul className="flex font-medium p-0 border-gray-100 rounded-lg bg-gray-50 md:space-x-8 space-x-reverse flex-row mt-0 border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" className={`${pathname == '/' ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Home</a>
                        </li>
                        <li>
                            <a href="/feeds" className={`${pathname == '/feeds' ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Feeds</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
"use client"
import Link from 'next/link'
import { useUser,UserButton} from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Navbar(props){
    const {isLoaded,isSignedIn,user}=useUser()

    useEffect(()=>{
        console.log(user)
    },[isSignedIn,user])

    return (
        <div className='h-20'>
            <div className='w-full h-24 text-gray-200 rounded-t-xl border-black bg-[#1b1b1b] flex justify-between p-5 px-16' >
                    <div className='logo '>
                        <img src="../../../logo.png" className='h-[100%] rounded' alt="Image" />
                    </div>
                    <div className='flex gap-4 items-center text-lg font-medium bg-[#4b4b4b] rounded-full py-2 px-4'>
                        {
                            (isSignedIn) &&
                            <>
                                {user.firstName}
                                <UserButton afterSignOutUrl='/'/>
                            </>
                        }
                        {
                            (!isSignedIn) &&
                            <Link href={"/sign-in"}>
                                Sign In
                            </Link>
                        }
                    </div>
            </div>
         </div>
    )
}
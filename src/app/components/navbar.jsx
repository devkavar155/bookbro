import Link from 'next/link'
import { useUser,UserButton} from '@clerk/nextjs'

export default function Navbar(props){
    const {isLoaded,isSignedIn,user}=useUser()

    return (
        <div className='h-20'>
            <div className='fixed w-[85.6%] h-24 text-gray-200 rounded-t-xl border-black bg-[#101418] flex justify-between p-5 px-16' >
                    <div className='logo '>
                        <img src="../../../logo.png" className='h-[100%] rounded' alt="Image" />
                    </div>
                    <div className='flex gap-4 items-center text-lg font-medium bg-[#1b1b1b] rounded-full py-2 px-4'>
                        {
                            (isSignedIn) &&

                            // (user)  &&
                            <>
                                {user.firstName}
                                <UserButton/>
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
"use client"
import {useState,useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import Link from 'next/link'
import { SiBookstack } from "react-icons/si";
import { TbBooks,TbBooksOff } from "react-icons/tb";
import Btn from "./button";
import { IoBookSharp } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { useUser} from '@clerk/nextjs'
import { IoIosNotifications } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";


export default function SideBar(){
    const {isSignedIn,user}=useUser()
    const [books,setBooks]=useState([])
    const [totalBooks,setTotalBooks]=useState(0)

    useEffect(()=>{
       
        fetch('/api/browseAllBooks')
        .then(res=>res.json())
        .then(res=>{
            setBooks(res)
        })
        if (user){
            fetch('/api/saveUser',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
            })
            
        }
        console.log(user,"user")

    },[isSignedIn,user])


    const finalBookTitle=(title)=>{
        setTotalBooks(totalBooks+1)
        if(title.length>13){
            return title.slice(0,13)+"..."
        }
        else{
            return title
        }
    }

    return(
        <div className="">
            <div className="Navbar p-2 w-max h-screen bg-black gap-2 text-gray-200 flex flex-col ">
                <div className=' bg-[#1b1b1b] rounded-xl p-2'>

                    <Link href="/dashboard/home">
                        <Btn
                            title="Home"
                            icon={<GoHomeFill size={20}/>}
                            />
                    </Link>
                    <Link href="/dashboard/getABook">
                        <Btn
                            title="Search"
                            icon={<IoSearch size={20}/>}
                            />
                    </Link>
                </div>

                <div className="flex flex-col bg-[#1b1b1b] rounded-xl p-2 text-[80%] xl:text-[90%] min-[1535px]:text-[100%] gap-2">
                    <Link href="/dashboard/booksBorrowed">
                        <Btn
                            title="Books Borrowed"
                            icon={<TbBooks size={20}/>}
                            >
                        </Btn>
                    </Link>
                    <Link href="/dashboard/booksLent">
                        <Btn
                            title="Books Lent"
                            icon={<TbBooksOff size={20}/>}
                            />
                    </Link>

                    <Link href="/dashboard/lendBooks">
                        <Btn
                            title="Lend a Book"
                            icon={<IoBookSharp size={20}/>}
                            />
                    </Link>

                    <Link href="/dashboard/analytics">
                        <Btn
                            title="Analytics"
                            icon={<TfiStatsUp size={20}/>}
                            />
                    </Link>
                    <Link href="/dashboard/profilePage">
                        <Btn
                            title="Profile"
                            icon={<RxAvatar size={20}/>}

                            />
                    </Link>
                    <Link href="/dashboard/notifications">
                        <Btn
                            title="Notifications"
                            icon={<IoIosNotifications size={20}/>}
                            />
                    </Link>

                </div>

                <div className=' bg-[#1b1b1b] rounded-xl h-full p-2'>
                        <Link href="/dashboard">
                            <Btn
                                title="Your Collection"
                                icon={<SiBookstack size={20}/>}
                                />
                        </Link>

                        <div className="pl-4 min-[1919px]:gap-1 flex flex-col font-semibold text-[13px] overflow-hidden opacity-80" key={"bookss"}>
                            <div>

                        {
                            
                            books.map((book,index)=>
                            (user && book.owner==user.id) && totalBooks<13 &&
                            (
                                <li key={book._id}>
                                    {finalBookTitle(book.title).toUpperCase()}
                                </li>
                                )
                                )
                            }
                            </div>

                        </div>
                </div>
            </div>  
        </div>
    )
}
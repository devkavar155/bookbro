"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function Analytics() {

    // const {isSignedIn,user}=useUser()
    // const [requestedBooks,setRequestedBooks]=useState([])
    // const [requestedBy,setRequestedBy]=useState([])
    // const [books,setBooks]=useState([])

    // const addAllCurrUserBooks=(user)=>{
    //     user.requests.map((curr)=>{

    //         getAllBooks(curr.bookId,curr.requestedBy)
    //         setRequestedBooks(prev => [...prev, curr.bookId]);
    //         setRequestedBy(prev => [...prev, {[curr.bookId]: curr.requestedBy}]);

    //     })
    // }

    // const getAllBooks=(id,requestedBy)=>{
    //     fetch('/api/getOneBook?bookId='+id)
    //     .then(res=>res.json())
    //     .then(res=>{
    //         console.log(res,"resssssssssss")
    //         res.requested=requestedBy.res._id
    //         setBooks(books=>[...books,res.book])
    //     })
    // }

    // const addAllBooks=async ()=>{
    //     await fetch('/api/getOneUser?id='+user.id)
    //     .then(res=>res.json())
    //     .then(async res=>{
    //         // console.log(res,"res")
    //         if (res.user.requests){
    //             addAllCurrUserBooks(res.user)
    //         }
    //     })
    // }

    // const check=()=>{
    //     const temp='65847043738149253c358c2f'
    //     console.log(requestedBy,"reqBy")
    //     console.log(requestedBy["65847043738149253c358c2f"],"temp")
    //     // console.log(requestedBooks,"requestedBooks")
    //     // console.log(books,"books")
    // }

    // useEffect(()=>{
    //     if (isSignedIn && user){
    //         addAllBooks()
    //     }
    // },[isSignedIn,user])

    return(
        <div className="bg-black h-screen flex">
            <div>
                <SideBar/>
            </div>
            <div className="bg-black h-screen w-full pr-2 text-gray-200 flex flex-col gap-3 text-center justify-center items-center text-6xl">

                <p>
                    Coming Soon
                </p>
                <p>
                    Stay Tuned
                </p>                
                <p>
                    (●'◡'●)
                </p>                

                
            </div>
        </div>
    )
}
"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function Notifications() {

    const {isSignedIn,user}=useUser()
    const [requestedBooks,setRequestedBooks]=useState([])
    const [requestedBy,setRequestedBy]=useState([])
    const [books,setBooks]=useState([])

    const addAllCurrUserBooks=(user)=>{
        user.requests.map((curr)=>{

            getAllBooks(curr.bookId,curr.requestedBy)
            setRequestedBooks(requestedBooks=>[...requestedBooks,curr.bookId])
            setRequestedBy(requestedBy=>[...requestedBy,{[curr.bookId]:curr.requestedBy}])
        })
    }

    const getAllBooks=(id,requestedBy)=>{
        fetch('api/getOneBook?bookId='+id)
        .then(res=>res.json())
        .then(res=>{
            res.book.requestedBy=requestedBy
            setBooks(books=>[...books,res.book])
        })
    }

    const addAllBooks=async ()=>{
        await fetch('/api/getOneUser?id='+user.id)
        .then(res=>res.json())
        .then(async res=>{
            // console.log(res,"res")
            if (res.user.requests){
                // console.log(res.user,"usessssssssr")    
                addAllCurrUserBooks(res.user)
            }
        })
    }

    const check=()=>{
        console.log(requestedBy,"reqBy")
        console.log(requestedBooks,"requestedBooks")
    }

    useEffect(()=>{
        if (isSignedIn && user){
            addAllBooks()
        }
    },[isSignedIn,user])

    return(
        <div className="bg-black h-screen flex">
            <div>
                <SideBar/>
            </div>
            <div className="bg-black h-screen w-full pr-2">
                <button onClick={check} className=" h-20 w-20 bg-blue-200 text-white">
                    click me
                </button>
            </div>
        </div>
    )
}
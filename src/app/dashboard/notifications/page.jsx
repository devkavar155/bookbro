"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function Notifications() {

    const {isSignedIn,user}=useUser()
    const [requestedBooks,setRequestedBooks]=useState({})
    const [books,setBooks]=useState([])

    const addAllCurrUserBooks=async(user)=>{
        user.requests.map(async(book)=>{
            setRequestedBooks({...requestedBooks,[book]:user.id})
        })
    }

    useEffect(()=>{
        if (isSignedIn && user){

            fetch('/api/getOneUser?id='+user.id)
            .then(res=>res.json())
            .then(res=>{
                console.log(res,"res")
                if (res.user.requests){
                    console.log(user,"usessssssssr")    
                    addAllCurrUserBooks(user)
                    return user
                }
            })
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
        }
    },[isSignedIn,user])

    return(
        <div className="bg-black h-screen flex">
            <div>
                <SideBar/>
            </div>
            <div className="bg-black h-screen w-full pr-2">
                {/* <GetAllBooks
                    page="Notifications"
                /> */}
            </div>
        </div>
    )
}
"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect, useState } from "react"

export default function Notifications() {

    const [requests,setRequests]=useState([])
    const [books,setBooks]=useState([])

    useEffect(async ()=>{
        await fetch('/api/getAllUsers')
        .then(res=>res.json())
        .then(res=>{
            const check=res.filter(
                user=>{
                    if (user.requests){
                        return user
                    }
                }
            )
            setRequests(check)
            console.log(requests,"requests")
        })
        // await fetch('/api/browseAllBooks')
        // .then(res=>res.json())
        // .then(res=>{
        //     console.log(res,"res")
        //     const check=res.filter(book=>{
        //         if (book._id in requests && book.owner==book){
        //             return book
        //         }
        //     })
        //     setBooks(check)
        //     console.log(check,"check")
        // })

    },[])

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
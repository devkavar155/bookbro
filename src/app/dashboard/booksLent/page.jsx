"use client"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect,useState } from "react"
import { useUser } from "@clerk/nextjs"
import Sidebar from "@/app/components/sideBar"

export default function BookBorrowed() {

    const [books,setBooks]=useState([])
    const {isSignedIn,user}=useUser()
    console.log(user,"user")
    useEffect(()=>{
        if (isSignedIn && user){
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                console.log(res,"res")
                const check=res.filter(book=>{
                    if (user && book.owner==user.id && book.borrower.)
                    return book
                })
                setBooks(check) 
                console.log(check,"check")
            })
        }
    },[isSignedIn,user])


    return(
        <div className="flex h-screen bg-black">
            <Sidebar/>
            <GetAllBooks
                books={books}
                // width="w-[21%]"
                // wContainer="w-[24%]"
                borrower="true"
                page="Books Lent"
                returned="true"
                />
        </div>
    )
}
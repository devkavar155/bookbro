"use client"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect,useState } from "react"
import { useUser } from "@clerk/nextjs"
import Sidebar from "@/app/components/sideBar"
import SignInPage from "../../sign-in/[[...sign-in]]/page"

export default function BookBorrowed() {

    const [books,setBooks]=useState([])
    const {isSignedIn,user}=useUser()

    console.log(user,"user")
    useEffect(()=>{
        if (isSignedIn){
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                const check=res.filter(book=>{
                    if (user && book.borrower==user.id)
                        return book
                })
            setBooks(check)
            })
        }
        
    },[])

    if (isSignedIn && user){
        return(
            <div className="flex bg-[#101418] h-screen ">
            <Sidebar/>
                <GetAllBooks
                    books={books}
                    width="w-[21%]"
                    wContainer="w-[24%]"
                    owner="true"
                    page="Books Borrowed"    
                    return="true"
                    />
        </div>
        )
    }
    return (
        <div className="flex bg-[#101418] h-screen ">
            {
                window.location.replace("/sign-in")
            }
        </div>
    )
}
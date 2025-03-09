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
                    if (user && book.owner==user.id && book.borrower)
                    return book
                })
                setBooks(check) 
                console.log(check,"check")
            })
        }
    },[isSignedIn,user])

    if (isSignedIn && user){
        return(
            <div className="flex h-screen bg-black">
                <Sidebar/>

                {
                    (books.length==0) &&
                    <div className="flex items-center justify-center w-full h-full text-white text-2xl">No Books Lent</div>
                }
                {
                    (books.length>0) &&
                    
                    <GetAllBooks
                    books={books}
                    // width="w-[21%]"
                    // wContainer="w-[24%]"
                    borrower="true"
                    page="Books Lent"
                    returned="true"
                    />
                }
            </div>
        )
    }
    return (
        <div className="flex bg-[#101418] h-screen ">
            {   (typeof window !== 'undefined') &&
                window.location.replace("/sign-in")
            }
        </div>
    )
}
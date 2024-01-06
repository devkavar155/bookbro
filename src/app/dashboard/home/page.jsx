"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect,useState } from "react"
import { useUser } from "@clerk/nextjs" 

export default function Home(){

    const [books,setBooks]=useState([])
    const {isSignedIn,user}=useUser()

    useEffect(()=>{
        if (isSignedIn && user){

            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                const check=res.filter(book=>{
                    if (book.owner==user.id)
                    return book
                })
                setBooks(check)
            })
        }
    },[isSignedIn,user])
    
    if (isSignedIn && user){
        return(
            <div className="bg-black h-screen">
                <div className="flex h-full">
                    <SideBar/>
                    <GetAllBooks
                        books={books}
                        page="All Library"
                        // rent="true"
                        edit="true"
                        />
                </div>
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
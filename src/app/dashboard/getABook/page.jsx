"use client"
import { useEffect,useState } from "react"
import GetAllBooks from "../../components/getAllBooks";
import SideBar from "../../components/sideBar";
import { useUser } from "@clerk/nextjs";

export default function BrowseBooks(){

    const [books,setBooks]=useState([])
    const {isSignedIn,user}=useUser()

    useEffect(()=>{ 
        if (isSignedIn && user){
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                const available=res.filter(book=>{
                    if (book.borrower=="" | !book.borrower){
                        if (book.owner!=user.id)
                        return book
                }
            })
            console.log(available,"available")
            setBooks(available)
            })
        }
        else{
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                setBooks(res)
            })

        }
    },[isSignedIn,user])

  
    return (
        <div className="bg-black h-screen">
            <div className="flex h-full">
                <SideBar/>
                <GetAllBooks
                    books={books}
                    
                    page="All Library"
                    rent="true"
                    />
            </div>
        </div>
    )
}
           
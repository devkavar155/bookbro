"use client"

import { useUser} from "@clerk/nextjs"
import { useEffect,useState } from "react"
import SideBar from "../../components/sideBar";
import GetAllBooks from "../../components/getAllBooks";

export default function Dashboard() {
    
    const [books,setBooks]=useState([])
    const {isSignedIn,user}=useUser()

    useEffect(() => {

        fetch('/api/browseAllBooks')
        .then(res=>res.json())
        .then(res=>{
            setBooks(res.filter(book=>{
                if (user && book.owner==user.id)
                    return book
            }))
            .then(res=>{
                console.log(res,"res")
            })
        })
    }, [])
    return (
        <div className="bg-[#101418] pb-24">
            <div className="flex bg-[#101418] h-screen ">
                <SideBar
                    page="My Library"
                />
                <div className="w-full text-gray-200"> 
                    <GetAllBooks
                        books={books}
                        width="w-[21%]"
                        wContainer="w-[24%]"
                        
                        rent="true"

                        />
                </div>
            </div>
        </div>
    )
}
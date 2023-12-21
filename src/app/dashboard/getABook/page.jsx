"use client"
import { useEffect,useState } from "react"
import GetAllBooks from "../../components/getAllBooks";
import SideBar from "../../components/sideBar";

export default function BrowseBooks(){

    const [books,setBooks]=useState([])

    useEffect(()=>{ 
            fetch('/api/browseAllBooks')
            .then(res=>res.json())
            .then(res=>{
                setBooks(res)
            })
    },[])

  
    return (
        <div className="bg-black">
            <div className="flex bg-[#101418] h-fit">
                <SideBar/>
                <GetAllBooks
                    books={books}
                    width="w-[21%]"
                    wContainer="w-[24%]"
                    page="All Library"
                    rent="true"
                    />
            </div>
        </div>
    )
}
           
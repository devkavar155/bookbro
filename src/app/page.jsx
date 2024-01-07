"use client"
import { useEffect } from "react";
import GetABook from "./dashboard/getABook/page";
export default function Main() {

    useEffect(()=>{
        window.location.replace("/dashboard/getABook")
    },[])

    return (
        <div className="bg-black h-screen overflow-hidden text-white">
            {/* {window.location.replace("/dashboard/getABook")} */}
            <GetABook/>
        </div>    
    )
}
"use client"
import { useEffect } from "react";
import Home from "./dashboard/home/page";
export default function Main() {

    return (
        <div className="bg-black h-screen overflow-hidden text-white">
            <Home/>
        </div>    
    )
}
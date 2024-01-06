"use client"

import { useEffect ,useState} from "react";
import LendBookForm from "../../components/lendBooksForm";
import SideBar from "../../components/sideBar";
import {isSignedIn ,useUser} from "@clerk/nextjs"
import { SignIn } from "@clerk/nextjs";

export default function LendBooks(){

    const {isSignedIn,user}=useUser()
    const [currUser, setCurrUser] = useState({})

    useEffect(()=>{
        if (isSignedIn){
            setCurrUser(user)
        }
    },[isSignedIn,user])

    return (
        <div className="bg-black h-screen">
                <div className="flex bg-[#101418] h-screen">
                    <SideBar/>
                    {
                        (isSignedIn) &&
                        <LendBookForm   
                            page="Lend Book"
                            />
                        || 
                        (!isSignedIn) &&
                        window.location.replace("/sign-in")
                    }
                </div>
                        
        </div>
    )
}
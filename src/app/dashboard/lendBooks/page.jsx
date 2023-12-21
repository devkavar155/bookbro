"use client"

import { useEffect ,useState} from "react";
import LendBookForm from "../../components/lendBooksForm";
import SideBar from "../../components/sideBar";
import {isSignedIn ,useUser} from "@clerk/nextjs"

export default function LendBooks(){

    const {isSignedIn,user}=useUser()
    const [currUser, setCurrUser] = useState({})

    useEffect(()=>{
        if (isSignedIn){
            setCurrUser(user)
        }
    },[isSignedIn,user])

    return (
        <div className="bg-black">
                {

                    (isSignedIn) &&
                    <div className="flex bg-[#101418] h-fit">
                        <SideBar/>
                        <LendBookForm   
                            page="Lend Book"
                            />
                    </div>
                }
                {(!isSignedIn) &&
                    <div className="bg-black">
                        <div className="flex bg-[#101418] h-fit">
                            <SideBar/>
                            <div className="w-full text-gray-200"> 
                                <div className="w-full h-full flex items-center justify-center rounded-xl  bg-[#101418]">
                                    <h1 className="text-4xl">Please Sign In</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                }
        </div>
    )
}
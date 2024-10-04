"use client"

import SideBar from "@/app/components/sideBar"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { getCurrentUser } from "@/utils/currUser"
import GetAllBooks from "@/app/components/getAllBooks"

export default function Notifications() {

    const { isSignedIn, user } = useUser()

    const [books, setBooks] = useState([])

    const [currUser, setCurrUser] = useState({})



    const traverseBooks = async (currUser) => {
        console.log(currUser, "currUser from notificaiton")
        const tempBooks = []
        currUser.user.requests.map(async (request) => {
            // const tempBook = await getEachBookInfo(request.bookId)
            const tempBook = await fetch('/api/getOneBook/' + request.bookId)
            .then(res => res.json())
            .then(res => {
                return res
            })
            .then(res => {
                const curr = books
                curr.push(res)
                console.log(res, "currBook insiide res")
                setBooks([...books, curr])
            })
        })
    }




    const getCurrUser = async () => {

        const tempUser = await getCurrentUser(user.id)
        window.sessionStorage.setItem("tempUser", JSON.stringify(tempUser));
        console.log(tempUser, "currUser from notificaiton")
        console.log(tempUser.user, "currUser from notificaiton")
        traverseBooks(tempUser)
        setCurrUser(tempUser)
        setTimeout(() => {
            console.log(books, "books")
        }, 2000)
    }

    useEffect(() => {
        if (isSignedIn && user) {
            console.log(user.id, "notificatoin id")
            getCurrUser(user.id)
        }
    }, [isSignedIn, user])


    if (books.length > 0){

        return (
            // <div className="bg-black h-screen flex">
            //     <div>
            //         <SideBar/>
            
            //     </div>
            //     <div className="bg-black h-screen w-full pr-2 text-gray-200 flex flex-col gap-3 text-center justify-center items-center text-6xl">
            
        //         <p>
        //             Coming Soon
        //         </p>
        //         <p>
        //             Stay Tuned
        //         </p>                
        //         <p>
        //             ^_^
        //         </p>                
        
        
        //     </div>
        // </div>
        
        <div className="bg-black">
            <div className="flex ">
                <SideBar />
                <GetAllBooks
                    books={books}
                    page="All Library"
                    rent="true"
                    // edit="true"
                    />
            </div>
        </div>
    )
}
}
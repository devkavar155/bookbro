"use client"
import SideBar from "@/app/components/sideBar"
import GetAllBooks from "@/app/components/getAllBooks"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

import { browseAllBooks } from "@/utils/browseAllBooks"

export default function Home() {

    const [books, setBooks] = useState([])
    const { isSignedIn, user } = useUser()

    const getBooks = async () => {
        const currBooks = await browseAllBooks()
        // console.log(currBooks, "currBooks")
        if (isSignedIn && user) {
            console.log("currBooks", currBooks)
            const check = currBooks.filter(book => {
                if (book.owner != user.id)
                    return book
            })
            console.log(check, "check")
            setBooks(check)
        }
        else {
            setBooks(currBooks)
        }
    }
    useEffect(() => {
        getBooks()
    }, [isSignedIn, user])

    if (isSignedIn && user) {
        return (
            <div className="bg-black h-screen">
                <div className="flex h-full">
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
    return (
        <div className="flex bg-[#101418] h-screen ">
            {
                window.location.replace("/sign-in")
            }
        </div>
    )
}
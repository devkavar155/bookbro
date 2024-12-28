"use client"
import { SignIn, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { TextField, Button } from "@mui/material"
import Sidebar from "../../components/sideBar"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from "../../components/navbar"
import Image from "next/image"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: "#dfdfdf"
        },
    },
});

export default function ProfilePage() {

    const { isSignedIn, user } = useUser()

    const [currentUser, setCurrentUser] = useState({ fullName: "Full Name", email: "Email", number: "Edit To Fill Details", address: "Edit To Fill Details", city: "Edit To Fill Details", id: "id" })
    const [differentUser, setDifferentUser] = useState(false)
    const [readOnly, setReadOnly] = useState(true)
    const [editButton, setEditButton] = useState(true)
    const [editFieldColor, setEditFieldColor] = useState("#dfdfdf")

    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (isSignedIn && user) {
            console.log("else")
            fetch("/api/getOneUser/" + user.id)
                .then(res => res.json())
                .then(res => {
                    setCurrentUser({
                        ...currentUser,
                        fullName: res.user.fullName,
                        email: res.user.email,
                        id: res.user.id,
                        address: res.user.address,
                        city: res.user.city,
                        number: res.user.number
                    })
                    setCheck(true)
                    setDifferentUser(false)
                })
        }

    }, [isSignedIn, user])

    console.log(currentUser, "currentUser")

    const editDetails = () => {
        console.log()
        if (!editButton) {
            console.log(currentUser, "currentUser")
            fetch("/api/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: currentUser.id,
                    number: currentUser.number,
                    address: currentUser.address,
                    city: currentUser.city
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        alert(res.error)
                    }
                    else {
                        alert("Details Updated")
                    }
                    console.log(res, "res")
                })
            console.log("save")
        }
        setReadOnly(!readOnly)
        setEditButton(!editButton)
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <div className="bg-black h-full">

                <div className="flex h-full bg-black">
                    <Sidebar />
                    {
                        (isSignedIn) && (
                            // <div className="bg-black h-screen w-full p-2 pl-0">
                            <div className="bg-black h-screen w-full p-2 pl-0">
                            {/* <div className="bg-black min-[1919px]:h-[92%] h-[90%] w-full p-2 pl-0"> */}
                                <Navbar></Navbar>
                                <div className="bg-[#1b1b1b] h-full w-[100.15%] min-[1919px]:w-full text-gray-200 rounded-xl">
                                    {/* <div className="bg-[#1b1b1b] h-full w-[100.15%] min-[1919px]:w-full text-gray-200 rounded-xl"> */}
                                    <div className="w-fit h-full flex min-[1919px]:gap-20 min-[1919px]:p-14 p-8 px-16 gap-10">
                                        {
                                            (isSignedIn) &&
                                            (
                                                <img src={user.imageUrl} className="rounded-xl min-[1919px]:h-64 h-44  w-fit bg-[#1b1b1b]" alt="" />
                                            )
                                        }
                                        <div className="bg-[#1b1b1b] p-4 rounded-xl flex flex-col gap-2 h-fit">

                                            <div className="details w-64 flex flex-col gap-2 ">
                                                User Details
                                                <TextField
                                                    disabled={!editButton}
                                                    id="name"
                                                    label="Name"
                                                    value={currentUser.fullName}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    variant="outlined"
                                                />

                                                <TextField
                                                    disabled={!editButton}
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    value={currentUser.email}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    variant="outlined"

                                                />
                                                <TextField
                                                    id="number"
                                                    label="Number"
                                                    value={currentUser.number}
                                                    color="warning"
                                                    name="number"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                    }}
                                                    onChange={(e) => {
                                                        setCurrentUser({
                                                            ...currentUser,
                                                            number: e.target.value
                                                        })
                                                    }}
                                                />
                                                <TextField
                                                    id="number"
                                                    label="Address"
                                                    value={currentUser.address}
                                                    color="warning"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        style: {
                                                            editFieldColor
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setCurrentUser({
                                                            ...currentUser,
                                                            address: e.target.value
                                                        })
                                                    }}
                                                />
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="City"
                                                    value={currentUser.city}
                                                    color="warning"
                                                    name="city"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                    }}
                                                    onChange={(e) => {
                                                        setCurrentUser({
                                                            ...currentUser,
                                                            city: e.target.value
                                                        })
                                                    }}
                                                />

                                            </div>

                                            <div className="bg-[#fc9c04] w-fit rounded ">
                                                <Button onClick={editDetails}>
                                                    <span className="text-black font-bold text-lg">
                                                        {editButton ? "Edit" : "Save"}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        )
                    }
                    {
                        (!isSignedIn && !user) &&
                        window.location.replace("/sign-in")
                    }

                </div>
            </div>

        </ThemeProvider>

    )
}
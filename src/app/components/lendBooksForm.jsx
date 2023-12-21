"use client"
import { TextField,Button,FormControl,InputLabel,Select,MenuItem,Rating,Typography,InputAdornment} from "@mui/material"
import { Poppins } from "next/font/google"
import { useEffect, useState } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import Navbar from "./navbar"

const poppins=Poppins({subsets:['latin'],
weight:['400','500','600','700','800','900']})



export default function RentBooks(){

    // const title=useRef()
    const [formData,setFormData]=useState({"title":"","price":"","image":"","owner":"","condition":"Brand New","city":"","rating":"5"})
    // const [title,setTitle]=useState()
    // const [price,setPrice]=useState()
  
    // const [image,setImage]=useState()
    const [reader,setReader]=useState()
    const {isSignedIn,user} = useUser();
    const postImage=()=>{
        fetch('/api/lendBook',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:formData.title,
                price:formData.price,
                owner:user.id,
                image:formData.image
            })
        })
        .then(res=>{
            return res.json()
        }).then(res=>{
            if (res.error){
                alert(res.error)
            }
            else{
                alert("Book Uploaded")
            }
        })
    }

    const uploadBook=(e)=>{
        reader.onload=(e)=>{
            setFormData({...formData,image:e.target.result})
            // setImage(e.target.result)
        }
        const f=e.target.files[0];
        const check=reader.readAsDataURL(f);
    }

    const getFormData=(e)=>{
        e.preventDefault();
        postImage();
    }

    const checkData=()=>{
        setFormData({...formData,owner:user.id})
        console.log(formData)
    }

    useEffect(()=>{
        setReader(new FileReader());
    },[])

    if (isSignedIn){
        return (
            <div className="p-2 pl-0 bg-black h-screen w-full">

            <div className="h-full bg-[#101418] rounded-xl">
                <Navbar
                    page="Lend A Book"
                />
                <div className={`h-full m-auto justify-center items-center ${poppins.className}`}>
                    <form action="" className="flex m-auto bg-white p-8 shadow-lg rounded-xl flex-col w-[500px] gap-5 mt-24">
                        <div className="font-bold text text-4xl">
                            Rent A Book
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextField id="title" label="Title" variant="outlined" onChange={(e)=>{
                                setFormData({...formData,title:e.target.value})
                            }}  />
                        </div>
                        <div className="flex flex-col">
                            <TextField id="price" label="Price" variant="outlined" 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }} 
                                placeholder="Price per Week" onChange={(e)=>{
                                setFormData({...formData,price:e.target.value})
                            }}  />
                        </div>
                        <div className="flex flex-col">
                            <TextField id="city" label="City" variant="outlined" onChange={(e)=>{ 
                                setFormData({...formData,city:e.target.value})
                            }}  />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-full">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={"Brand New"}
                                        label="Condition"    
                                        onChange={(e)=>{
                                            setFormData({...formData,condition:e.target.value})
                                        }}
                                        >
                                        
                                        <MenuItem value={"Brand New"}>Brand New</MenuItem>
                                        <MenuItem value={"Use (Good)"}>Use (Good)</MenuItem>
                                        <MenuItem value={"Used (Readable)"}>Used (Readable)</MenuItem>
                                        <MenuItem value={"Used (Not Good)"}>Used (Not Good)</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="pl-5">
                                <Typography component="legend" className="opacity-75">Ratings</Typography>
                                <Rating
                                    name="simple-controlled"
                                    label="Rating"
                                    defaultValue={null}
                                    onChange={(event, newValue) => {
                                        setFormData({...formData,rating:newValue})
                                    }}
                                    />
                            </div>
                        </div>

                        <div className="flex justify-between gap-5 font">
                            <Button className="w-full text-black bg-[#fc9c04]" component="label" variant="contained" >
                                <span className="font-bold text-base ">Upload file</span>
                                <input onChange={uploadBook} type="file" hidden />
                            </Button>
                        
                            <Button className="w-full h-12 text-black bg-[#fc9c04]" onClick={getFormData} variant="contained" >
                            <span className="font-bold text-base">Submit</span>
                            </Button>
                        </div>

                    </form>
                </div>

                <Button variant="contained" onClick={checkData}>
                    Checking
                </Button>
            </div>
            </div>

    )}

    else{
        return(
            <SignIn/>
        )
    }
}
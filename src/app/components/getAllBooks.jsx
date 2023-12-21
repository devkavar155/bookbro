
import {useState,useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import {TextField,Rating,Button,Typography} from '@mui/material';
import { useUser } from '@clerk/nextjs';
import Navbar from "./navbar"

export default function GetAllBooks(props){

    const [books,setBooks] = useState(props.books)
    const [users,setUsers] = useState([])
    const [allBooks,setAllBooks] = useState([])
    const [focusedBook,setFocusedBook] = useState({"title":"","price":"","image":"","owner":"","condition":"","city":"","rating":""})
    const [borrower,setBorrower]=useState([{fullName:""}])
    const [rentBookStyle,setRentBookStyle]=useState("h-96 w-96 bg-[#1b1b1b] hidden rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2")
    const [editButton,setEditButton]=useState(false)
    const [focusedOwner,setFocusedOwner]=useState({"fullName":"","email":"","number":"","city":""})

    const {isSignedIn,user}=useUser()

    useEffect(()=>{
        setBooks(props.books)
        setAllBooks(props.books)
        try{
            setFocusedBook({...focusedBook,title:props.books[0].title,price:props.books[0].price,image:props.books[0].image,owner:"Devvrat Rathod",ownerID:props.books[0].owner,condition:props.books[0].condition,city:props.books[0].city,rating:props.books[0].rating,borrower:""})
        }
        catch{
            if (props.page=="Books Lent")
                setFocusedBook({...focusedBook,title:"No Books Lent",price:"",image:"",owner:"",condition:"",city:"",rating:"",borrower:""})

            else if (props.page=="Books Borrowed")
                setFocusedBook({...focusedBook,title:"No Books Borrowed",price:"",image:"",owner:"",condition:"",city:"",rating:"",borrower:""})

            else
                setFocusedBook({...focusedBook,title:"No Books Found",price:"",image:"",owner:"",condition:"",city:"",rating:"",borrower:""})
        }
        fetch('/api/getAllUsers')
        .then(res=>res.json())
        .then(res=>{
            setUsers(res)
        })
        
    },[props.books[0]])

    const showFocusedImage=(e)=>{
        const targetElem=e.target.parentNode
        const selectedBook=books.filter(book=>book._id==targetElem.children[0].innerText)[0]
        const user=users.filter(user=>user.id==selectedBook.owner)
        console.log(selectedBook,"selectBook")
        if (selectedBook.borrower!=""){
            const borrowedBy=users.filter(user=>user.id==selectedBook.borrower)
            setBorrower({...borrower,fullName:borrowedBy[0].fullName})
        }
        else{
            setBorrower({...borrower,fullName:""})
        }
        console.log(borrower,"borrowedBy")
        setFocusedBook({...focusedBook,
            title:selectedBook.title,
            price:selectedBook.price,
            image:selectedBook.image,
            owner:user[0].fullName,
            condition:selectedBook.condition,
            city:selectedBook.city,
            rating:selectedBook.rating,
            borrower:borrower.fullName,
            ownerID:selectedBook.owner
        })

    }
    const finalBookTitle=(title)=>{
        if(title.length>13){
            return title.slice(0,13)+"..."
        }
        else{
            return title
        }
    }
    const bookSearch=(e)=>{
        const search=e.target.value
        if (search.length==0){
            setBooks(allBooks)
            return 
        }
        const filteredBooks=books.filter(book=>{
            const title=book.title.toLowerCase()
            let i=0;
            let j=0;
            while (j<title.length){
                if (search[i]==title[j]){
                    i++;
                }
                j++;
            }
            if (i>(search.length-1)){
                return book
            }
        })
        setFocusedBook({...focusedBook,title:filteredBooks[0].title,price:filteredBooks[0].price,image:filteredBooks[0].image})
        setBooks(filteredBooks)
        // console.log(filteredBooks,"filteredBooks")
    }

    const rentBookPopUp=()=>{
        if (editButton){
            fetch("/api/getOneUser?id="+focusedBook.ownerID)
            .then(res=>res.json())
            .then(res=>{
                console.log(res,"res")
                setFocusedOwner(res.user)
            })
            console.log(focusedBook.ownerID,"ownerID")
            setRentBookStyle("h-96 w-96 bg-[#fc9b01] rounded-xl hidden absolute duration-300  right-0 bottom-0 z-10")
            
        }
        else{
            setRentBookStyle("h-96 w-96 bg-[#fc9b01] rounded-xl  absolute right-2 bottom-2 z-10")
        }
        setEditButton(!editButton)
        
    }

    const sendRequestAlert=()=>{
        fetch("/api/updateBooks",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                // ownerID:focusedBook.ownerID,
                borrowerID:user.id,
                bookID:focusedBook._id
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.error){
                alert(res.error)
            }
            else{
                alert("Request Sent")
            }
        })
    }


    return(
        <div className="w-full h-screen overflow-hidden bg-black pl-0 p-2 text-gray-200"> 

            <Navbar 
                page={props.page}
                />
            <div className="flex justify-evenly bg-[#101418] md:pt-12 pb-12 min-[1919px]:pb-28  overflow-hidden h-[88%] min-[1919px]:h-[90.3%] scroll-smooth rounded-b-xl fixed w-[85.6%] border-black">
                <div className={``}>
                    <div className={`highLightBooks ${props.width} h-fit md:w-72 min-[1919px]:w-80 text-gray-200`}>
                        <div className=" flex bg-[#3b3b3b] p-5 mb-2 rounded-full">
                            <IoSearch size={25} className="mr-2 text-white hover:cursor-pointer h-full" />
                            <input placeholder='What do you want to read ?' 
                                className='text-white bg-[#3b3b3b] w-full outline-none' 
                                onChange={bookSearch}
                            />
                                
                        </div>
                

                        <div className={`bg-[#1b1b1b] p-5  rounded-xl`}>

                            <div className="">
                                <img className="h-[275px] min-[1919px]:h-[400px] rounded-xl object-cover" src={focusedBook.image} alt="Image"/>
                            </div>
                            <div className="pt-4">
                                <div className="text-[22px] text font-semibold ">{
                                    focusedBook.title.toUpperCase()
                                }
                                </div>
                                <div>
                                    <div key={"condition"} className='text-[14px]'>
                                        {focusedBook.condition}
                                    </div>
                                    <div key={"rating"} className=''>
                                        <Rating
                                            name="simple-controlled"
                                            label="Rating"
                                            value={parseInt(focusedBook.rating)}
                                            size='small'
                                            color='secondary'
                                            />
                                    </div>
                                </div>
                                <div key={"city"} className=' font-medium'>
                                    {focusedBook.city}
                                </div>
                                <div key={"price"} className="text-4xl text-white font-extrabold flex justify-between items-center">
                                    ₹{focusedBook.price}
                                    {
                                        (<div onClick={rentBookPopUp} className='ml-5'>
                                            <Typography className='bg-[#fc9b04] rounded-xl p-1  font-semibold'>
                                                <Button size='small' >
                                                    <span className='text-xl text-black font-bold'> 
                                                        {
                                                            (props.rent==="true") &&
                                                            ("Rent")
                                                        }
                                                        {
                                                            (props.returned==="true") &&
                                                            ("Returned")
                                                        }
                                                        {
                                                            (props.return==="true") &&
                                                            ("Return")
                                                        }
                                                    </span>
                                                </Button>
                                            </Typography>
                                        </div>)                                    
                                    }
                                </div>

                                <div className={rentBookStyle}>
                                    <div className='text-black font-bold p-2'>
                                        <div className='text-xl text-center'> 
                                            Contact Owner To Rent
                                        </div>
                                        <div className="flex justify-between flex-col gap-3 mt-4">
                                            <TextField id="name" label="Name" variant="outlined" value={focusedOwner.fullName} 
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField id="email" label="Email" variant="outlined" value={focusedOwner.email}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField id="number" label="Number" variant="outlined" value={focusedOwner.number}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField id="city" label="City" variant="outlined" value={focusedOwner.city} 
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </div>
                                        
                                        <div className='flex items-center gap-2 '>
                                            <hr className='w-full h-0 border-1 border-black' />
                                                or
                                            <hr className='w-full h-0 border-1 border-black'/>
                                        </div>
                                        
                                        <div className='bg-black text-[#fc9b04] hover:cursor-pointer hover:bg-[#1b1b1b] w-fit p-2 rounded-xl absolute right-2 bottom-2' 
                                            onClick={sendRequestAlert}
                                            >
                                            Send Request Alert
                                        </div>
                                    </div>
                                </div>


                                <div key={"owner"} className='opacity-80'>
                                    {
                                        (props.borrower==="true") &&
                                        (   <>
                                                Borrowed By - {focusedBook.borrower}
                                            </>
                                        ) ||
                                        (props.owner==="true") &&
                                        (   <>
                                                Seller - {focusedBook.owner}
                                            </>
                                        )
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 desktop:grid-cols-5 justify-items-center gap-y-24 gap-x-5 min-[1919px]:gap-x-10 overflow-auto scroll-smooth border-8 border-[#1b1b1b] bg-[#1b1b1b] rounded-xl">
                    {   
                        books.map(book=>(
                            <div className="w-48  rounded-xl fit opacity-90" key={book._id} >
                                <div className="hidden" name="id">
                                    {book._id}
                                </div>
                                <img className="h-56 object-none rounded-xl w-48" onClick={showFocusedImage} src={book.image} alt="Images" />
                                <div className="mt-5">
                                    <h1 className="text-[20px]">{
                                        finalBookTitle(book.title).toUpperCase()
                                        }
                                    </h1>
                                    <h2 className="text-xl">₹{book.price}</h2>
                                </div>
                            </div>
                        )
                        )}
                </div>
            </div>
        </div>
    )
}
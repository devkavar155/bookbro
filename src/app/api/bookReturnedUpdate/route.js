import { client } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req,res){
    const final= await req.json();
    const {_id,borrower} =final;
    const dateReturned=new Date();    

    const conn=await client.connect();
    const db = conn.db('bookohub');

    await db.collection("booksOnRent")
                .findOneAndUpdate({_id:new ObjectId(_id)},{$set:{borrower:"",onRent:false}});
    
    await db.collection("registeredUsers")
                .findOneAndUpdate({id:borrower,
                                booksBorrowed:
                                    {$elemMatch: { bookId: new ObjectId(_id) }}
                },{$set:{"booksBorrowed.$.dateReturned":dateReturned}});      
    
    return NextResponse.json({message: "Book Borrowed",id: new ObjectId(_id), borrower:borrower,dateReturned:dateReturned});
}
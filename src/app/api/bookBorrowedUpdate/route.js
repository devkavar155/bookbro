import { client } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req,res){
    const final= await req.json();
    const {_id,borrower} =final;
    const dateBorrowed=new Date();    

    const conn=await client.connect();
    const db = conn.db('bookohub');

    await db.collection("booksOnRent")
                .findOneAndUpdate({_id:new ObjectId(_id)},{$set:{borrower:borrower,onRent:true}});
    
    await db.collection("registeredUsers")
                .findOneAndUpdate({id:borrower},{$push:{booksBorrowed:{bookId:new ObjectId(_id),dateBorrowed:dateBorrowed}}});

    return NextResponse.json({message: "Book Borrowed",id: obj, borrower:borrower,dateBorrowed:dateBorrowed});
}
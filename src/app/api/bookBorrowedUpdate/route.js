import { client } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req,res){
    try{

        const final= await req.json();
        const {_id,borrower} =final;
        const dateBorrowed=new Date();    
        
        console.log("final",final);
        const conn=await client.connect();
        const db = conn.db('bookohub');
        
        const hehe1=await db.collection("booksOnRent")
        .findOneAndUpdate({_id:new ObjectId(_id)},{$set:{borrower:borrower,onRent:true}});
        
        const hehe2=await db.collection("registeredUsers")
        .findOneAndUpdate({id:borrower},{$push:{booksBorrowed:{bookId:new ObjectId(_id),dateBorrowed:dateBorrowed}}});
       
        console.log("hehe1",hehe1);
        console.log("hehe2",hehe2);
       
        return NextResponse.json({message: "Book Borrowed",id: new ObjectId(_id), borrower:borrower,dateBorrowed:dateBorrowed});
    }
    catch(err){
        console.log(err);
        return NextResponse.error(err);
    }
}
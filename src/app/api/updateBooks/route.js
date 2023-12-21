import { NextResponse } from "next/server";
import { client } from "../../../lib/mongodb";

export async function POST() {
    try{
        const data=await request.json();
        const {ownerID,borrowerID,bookID}=data; 
        const conn = await client.connect();
        const db = conn.db("bookohub");
        const books = await db.collection("books")
                        .findOneAndUpdate({_id:bookID},{$set:{ownerID:ownerID,borrowerID:borrowerID,onRent:true}})
        return NextResponse.json(books);
    }
    catch(err){
        return NextResponse.json({error:err});
    }
}

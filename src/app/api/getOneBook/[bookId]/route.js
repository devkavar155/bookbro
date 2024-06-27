import { NextResponse } from "next/server";
import {client} from "../../../../lib/mongodb"
import { ObjectId } from "mongodb";

export async function GET(req, {params}) {
    try{
        const bookId = params.bookId;

        const conn = await client.connect();
        const db = conn.db("bookohub");
        const books = await db.collection("booksOnRent").findOne({_id:new ObjectId(bookId)})

        return NextResponse.json(books);    
    }
    catch(err){
        console.log(err);
        return NextResponse.error(err);
    }
}
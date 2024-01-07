import { NextResponse } from "next/server";
import {client} from "../../../lib/mongodb"
import { ObjectId } from "mongodb";

export async function GET(req, res) {
    try{
        const bookId= req.nextUrl.searchParams.get("bookId");

        const conn = await client.connect();
        const db = conn.db("bookohub");
        const books = await db.collection("booksOnRent").find({_id:new ObjectId(bookId)})

        return NextResponse.json({books:books});    
    }
    catch(err){
        console.log(err);
        return NextResponse.error(err);
    }
}
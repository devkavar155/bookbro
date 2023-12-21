import { NextResponse } from "next/server";
import { client } from "../../../lib/mongodb";

export async function GET() {
    try{

        const conn = await client.connect();
        const db = conn.db("bookohub");
        const books = await db.collection("books").find().toArray();
        return NextResponse.json(books);
    }
    catch(err){
        return NextResponse.json({error:err});
    }
}

import {client} from '../../../lib/mongodb'; 
import { NextResponse } from 'next/server';
export async function GET() {
    try{
        const conn=await client.connect();
        const db=conn.db('bookohub');
        const books=await db.collection("booksOnRent").find({}).toArray();
        return NextResponse.json(books);
    }
    catch(err){
        return NextResponse.error(err);
    }
}
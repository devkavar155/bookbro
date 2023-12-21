// console.log(db);
import {client} from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request,response){

    try{
        const res=await request.json()
            const conn=await client.connect()
            const db=conn.db('bookohub');
            await db
            .collection("booksOnRent")
            .insertMany(res)
            return NextResponse.json({msg:"success"})
    }
    catch(err){
        return NextResponse.json({error:err, msg:"Internal Server Error"});
    }
}
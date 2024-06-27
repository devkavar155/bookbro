import {client} from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request, response) {
    try {

        const data=await request.json();

        const {id,email,fullName,imageUrl}=data;
      
        const conn = await client.connect();
        const db = conn.db('bookohub');
        const user=await db.collection("registeredUsers").findOne({email:email});
        // console.log(user,"request cameeeeee");
        if (!user){
            await db.collection("registeredUsers").insertOne({
                email:email,
                id:id,
                fullName:fullName
            })
            return NextResponse.json({
                msg: "New User Added",
            });
        }
        else{
            return NextResponse.json({
                msg: "User Already Exists",
            });
        }
    } catch (err) {
        return NextResponse.error(err);
    }
} // Path: src/app/api/checkUser/route.js
    // Compare this snippet from src/app/api/lendBook/route.js:

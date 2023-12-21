import {client} from '../../../lib/mongodb';
import {NextResponse} from 'next/server';

export async function GET(request, response) {
    
    try {
        const id= request.nextUrl.searchParams.get("id");

        const conn = await client.connect();
        const db = conn.db('bookohub');
        const user = await db.collection("registeredUsers").findOne({id: id});

        return NextResponse.json({user});
    }
    catch (err) {
        return NextResponse.json({error: err});
    }
}
// pages/api/getApiRoute.js

// pages/api/getApiRoute.js

// pages/api/getApiRoute.js

// import { NextRequest } from "next/server";

// export async function GET(request) {
//   return new Response("Hello, Next.js!");
// }
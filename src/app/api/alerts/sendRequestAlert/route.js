import { NextResponse } from "next/server";
import {client} from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
    try {
        const data = await req.json();
        const { bookId, requestedBy , requestedTo} = data;
        const conn = await client.connect();
        const db = conn.db('bookohub');

        const check=await db.collection("registeredUsers").findOne({id:requestedTo,requests:{$elemMatch:{bookId:bookId}}});
        if(check){
            return NextResponse.json({error:"Already requested",});
        }
        const user = await db.collection("registeredUsers").findOneAndUpdate({ id: requestedTo }, { $push: { requests: { bookId: bookId, requestedBy: requestedBy } } });

        return NextResponse.json({ message: user});
    }
    catch (err) {
        console.log(err);
        return NextResponse.error(err);
    }
}
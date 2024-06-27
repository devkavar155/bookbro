// api endpoint to get all books from the database except the books owned by the user
// cpde

// Path: src/app/api/browseAllOtherBooks/route.js

import {client} from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    try{
        const user = params.user;
        console.log(user, "request")
        // console.log(request.params.user, "user");
        const conn=await client.connect();
        const db=conn.db('bookohub');
        // get books where email is not user email
        const books=await db.collection("booksOnRent").find({owner:{$ne:user}}).toArray();
       

        return NextResponse.json(books);
    }
    catch(err){
        return NextResponse.error(err);
    }
}
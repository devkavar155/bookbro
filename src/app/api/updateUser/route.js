import {client} from '../../../lib/mongodb';
import {NextResponse} from 'next/server';

export async function POST(req,res){
    
    try{
        const data=await req.json();
        const {id, number, address, city} = data;

        const conn = await client.connect();
        const db = conn.db('bookohub');
        const registeredUser = await db.collection("registeredUsers").findOneAndUpdate(
            {id: id},
            {
                $set:{
                    number: number,
                    address: address,
                    city: city,
                }
            })
            
        return NextResponse.json({data:registeredUser});
    }
    catch(err){
        return NextResponse.json({error: err});
    }
}
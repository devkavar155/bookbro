import {client} from '../../../lib/mongodb';
import {NextResponse} from 'next/server';

export async function POST(req,res){
    
    try{
        const data=await req.json();
        console.log(data,"data")
        const {id, number, address, city} = data;

        console.log(id,number,address,city,"working")
        
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
        console.log(registeredUser,"registeredUser")
            
        return NextResponse.json({data:registeredUser});
    }
    catch(err){
        console.log(err,"error")
        return NextResponse.json({error: err});
    }
}
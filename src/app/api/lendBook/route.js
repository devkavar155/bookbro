// console.log(db);
import {client} from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request,response){

    const validateData=(title,price,owner,image)=>{
            if (title===undefined || price===undefined || owner===undefined || image===undefined){
                return {msg:"Please fill all the fields"};
            }

            if(title.length<=0 || price.length<=0 || owner.length<=0 || image.length<=0 || title==="" || price==="" || owner==="" || image===""){
                return {msg:"Please fill all the fields"};
            }

            if(typeof(title) !=="string" || typeof(price) !=="number" || typeof(owner) !=="string" || typeof(image) !=="string" || price.toString()=="NaN"){
                return {msg:"Invalid Data"};
            }
            if (price<0){
                return {msg:"Price cannot be negative"};
            }

            return true;
        
    }

    try{
        const res=await request.json()
        const {title,priceInit,owner,image}=res;
        const price=parseInt(priceInit)


        const v=validateData(title,price,owner,image)
        if (v===true){
            const conn=await client.connect()
            const db=conn.db('bookohub');
            await db
            .collection("booksOnRent")
            .insertOne({
                title:title,
                price:price,
                owner:owner,
                image:image,
                onRent:false
            })
            return NextResponse.json({msg:"success"})
        }
        else{
            return NextResponse.json({error:v.msg});
        }       
    }
    catch(err){
        return NextResponse.json({error:err, msg:"Internal Server Error"});
    }
}
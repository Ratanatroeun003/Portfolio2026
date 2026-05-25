import {prisma} from '@/lib/prisma'
import { db } from '@/types/db';
import { NextResponse } from 'next/server'
export async function POST(request:Request){
    try {
        const body = await request.json() as db;
        const {name,email,message} = body;
        if(!name || !email || !message){
            return NextResponse.json({
                error:'all field are required'
            })
        }
        const saved = await prisma.message.create({
            data:{
                name,
                email,
                body:message,
                read:false
            }
        })
        return NextResponse.json({
            success:true,
            id: saved.id
        })
    } catch (error) {
        console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'មានបញ្ហា សូមព្យាយាមម្តងទៀត' },
      { status: 500 }
    );
    }
}
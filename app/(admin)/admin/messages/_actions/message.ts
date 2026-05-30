'use server'
import {prisma} from '@/lib/prisma'
import  {revalidatePath} from 'next/cache'
export const createMessage = async (prevState:any,formData:FormData)=>{
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const message = formData.get('message') as string
    if(!email || !name || !message){
        return {
            error:true,
            message:"All field are required!"
        }
    }
    try {
        await prisma.message.create({
            data:{
                name,
                email,
                body:message
            }      
        })
        return {
            success:true,
            message:'Successfully sent'
        }
    } catch (error) {
        return {
            error:true,
            message:'Something went wrong!'
        }
    }
}
export const markAsRead = async(id:number)=>{
    try {
        await prisma.message.update({
            where:{id},
            data:{read:true}
        })
        revalidatePath('/admin/message')
    } catch (error) {
        console.log('====================================');
        console.log('error update message');
        console.log('====================================');
    }
}
export const deleteMessage = async (id:number)=>{
    try {
        await prisma.message.delete({
            where:{id}
        })
        revalidatePath('/admin/message')
    } catch (err) {
        console.log('====================================');
        console.log('error delete message',err);
        console.log('====================================');
    }
}

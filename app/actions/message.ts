'use server'
import {prisma} from '@/lib/prisma'
import  {revalidatePath} from 'next/cache'
interface ActionResponse {
    success?:boolean;
    error?:boolean;
    message:string;
}
export const createMessage = async (prevState:any,formData:FormData):Promise<ActionResponse>=>{
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
export const markAsRead = async(id:string):Promise<ActionResponse>=>{
    try {
        await prisma.message.update({
            where:{id},
            data:{read:true}
        })
        revalidatePath('/admin/message')
        return {
            success:true,
            message:'Marked as read'
        }
    } catch (error) {
      return {
        error:true,
        message:'Something went wrong!'
      }
    }
}
export const deleteMessage = async (id:string):Promise<ActionResponse>=>{
    try {
        await prisma.message.delete({
            where:{id}
        })
        revalidatePath('/admin/message')
        return {
            success:true,
            message:'Message deleted'
        }
    } catch (err) {
     return{
        error:true,        
        message:'Something went wrong!'
     }
    }
}

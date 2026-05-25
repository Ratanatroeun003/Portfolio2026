'use server'
import {prisma} from '@/lib/prisma'
import  {revalidatePath} from 'next/cache'
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

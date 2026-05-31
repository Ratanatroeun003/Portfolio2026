'use server'

import { revalidatePath } from "next/cache";
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from "@/lib/cloudinary";
import { redirect } from "next/navigation";
export async function createProjects(prevState: any, formData: FormData) {
  const title = formData.get('title') as string | null;
  const description = formData.get('description') as string | null;
  const github = formData.get('github') as string | null;
  const demo = formData.get('demo') as string | null;
  const file = formData.get('image') as File | null;

  if (!title || !description) {
    return { error: 'សូមបំពេញព័ត៌មានចាំបាច់ឱ្យបានគ្រប់គ្រាន់ (Title & Description)!' };
  }
  try {
    let imageUrl = '/placeholder.jpg';
    if (file && file.size > 0) {
      imageUrl = await uploadToCloudinary(file);
    } else {
      return { error: 'សូមជ្រើសរើសរូបភាព Thumbnail របស់ Project ផង!' };
    }
    await prisma.project.create({
      data: {
        title: String(title),
        description: String(description),
        image: imageUrl,
        github: github ? String(github) : null,
        demo: demo ? String(demo) : null,
      },
    });
  } catch (error) {
    console.error('Prisma insert error inside Server Action:', error);
    return { error: 'មិនអាចរក្សាទុកទិន្នន័យចូលក្នុង Database បានឡើយ!' };
  }
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}
export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: { id },
    });

  } catch (error) {
    console.error('Delete failed:', error);
    return { success: false, error: 'មិនអាចលុបគម្រោងនេះបានទេ!' };
  }
  
    revalidatePath('/admin/projects');
    return { success: true };
}
export async function updateProject(prevState: any, formData: FormData) {
  const id = Number(formData.get('id'));
  const title = formData.get('title') as string | null;
  const description = formData.get('description') as string | null;
  const github = formData.get('github') as string | null;
  const demo = formData.get('demo') as string | null;
  const file = formData.get('image') as File | null;

  if (!id || !title || !description) {
    return { error: 'សូមបំពេញព័ត៌មានចាំបាច់ឱ្យបានគ្រប់គ្រាន់!' };
  }

  try {
    const oldProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!oldProject) return { error: 'រកមិនឃើញគម្រោងដែលត្រូវកែប្រែឡើយ!' };
    let url = oldProject.image;

    // ☁️ បើមានរូបភាពថ្មី ធ្វើការ Upload ជាន់ពីលើ
    if (file && file.size > 0) {
      url = await uploadToCloudinary(file);
    }
    await prisma.project.update({
      where: { id },
      data: {
        title: String(title),
        description: String(description),
        image: url,
        github: github ? String(github) : null,
        demo: demo ? String(demo) : null
      }
    });
  } catch (error) {
    console.error('Update failed:', error);
    return { error: 'ការកែប្រែទិន្នន័យបានបរាជ័យ!' };
  }

  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}
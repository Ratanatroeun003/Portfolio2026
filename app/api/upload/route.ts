import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary'; // 👈 import មកប្រើ

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file found" }, { status: 400 });
    }
    const imageUrl = await uploadToCloudinary(file);
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
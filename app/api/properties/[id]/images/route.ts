import { NextRequest, NextResponse } from 'next/server';
import { propertyService } from '@/lib/database/properties';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// Add images to a property
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = 'demo-user-id'; // In a real app, get from auth session
    
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const result = await uploadToCloudinary(base64String);
      uploadedImages.push(result);
    }

    // Add images to property
    const property = await propertyService.addPropertyImages(params.id, userId, uploadedImages);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      images: property.images 
    });
  } catch (error) {
    console.error('Error adding images:', error);
    return NextResponse.json(
      { error: 'Failed to add images' },
      { status: 500 }
    );
  }
}

// Delete an image from a property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = 'demo-user-id'; // In a real app, get from auth session
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');
    
    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(imageId);
    
    // Remove image from property
    const property = await propertyService.removePropertyImage(params.id, userId, imageId);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      images: property.images 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
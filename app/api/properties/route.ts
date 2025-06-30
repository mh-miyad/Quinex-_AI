import { NextRequest, NextResponse } from 'next/server';
import { propertyService } from '@/lib/database/properties';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the session
    // For now, we'll use a demo user ID
    const userId = 'demo-user-id';
    
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get('status'),
      type: searchParams.get('type'),
      search: searchParams.get('search'),
    };

    const properties = await propertyService.getProperties(userId, filters);
    
    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the session
    const userId = 'demo-user-id';
    
    const data = await request.json();
    
    const property = await propertyService.createProperty({
      ...data,
      userId,
    });
    
    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
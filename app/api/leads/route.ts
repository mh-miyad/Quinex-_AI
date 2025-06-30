import { NextRequest, NextResponse } from 'next/server';
import { leadService } from '@/lib/database/leads';

export async function GET(request: NextRequest) {
  try {
    const userId = 'demo-user-id';
    
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get('status'),
      score: searchParams.get('score'),
      search: searchParams.get('search'),
    };

    const leads = await leadService.getLeads(userId, filters);
    
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = 'demo-user-id';
    
    const data = await request.json();
    
    const lead = await leadService.createLead({
      ...data,
      userId,
    });
    
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
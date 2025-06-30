import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');
    
    const contactData = {
      ...data,
      createdAt: new Date(),
      status: 'new',
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    const result = await contactsCollection.insertOne(contactData);
    
    // In a real application, you might also:
    // 1. Send an email notification to your team
    // 2. Send an auto-reply to the user
    // 3. Add to a CRM system
    // 4. Trigger webhooks

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Contact form submitted successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve contact submissions (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');
    
    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    
    // Get total count
    const total = await contactsCollection.countDocuments(query);
    
    // Get paginated results
    const contacts = await contactsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      contacts: contacts.map(contact => ({
        ...contact,
        id: contact._id.toString(),
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const db = await getDatabase();
    const newsletterCollection = db.collection('newsletter_subscribers');
    
    // Check if email already exists
    const existingSubscriber = await newsletterCollection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    const subscriberData = {
      email,
      subscribedAt: new Date(),
      status: 'active',
      source: 'website',
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    const result = await newsletterCollection.insertOne(subscriberData);
    
    // In a real application, you might also:
    // 1. Send a welcome email
    // 2. Add to email marketing platform (Mailchimp, SendGrid, etc.)
    // 3. Trigger automation workflows

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Successfully subscribed to newsletter',
    }, { status: 201 });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve newsletter subscribers (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    
    const db = await getDatabase();
    const newsletterCollection = db.collection('newsletter_subscribers');
    
    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    
    // Get total count
    const total = await newsletterCollection.countDocuments(query);
    
    // Get paginated results
    const subscribers = await newsletterCollection
      .find(query)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      subscribers: subscribers.map(subscriber => ({
        ...subscriber,
        id: subscriber._id.toString(),
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        active: await newsletterCollection.countDocuments({ status: 'active' }),
        unsubscribed: await newsletterCollection.countDocuments({ status: 'unsubscribed' }),
      },
    });

  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
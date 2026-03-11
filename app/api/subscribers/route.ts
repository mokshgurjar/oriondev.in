import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(req: NextRequest) {
  // Simple Authorization protection
  const authHeader = req.headers.get('authorization');
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscribers = await sql`
        SELECT id, email, token, active, created_at 
        FROM subscribers
        ORDER BY created_at DESC
    `;

    return NextResponse.json({ subscribers }, { status: 200 });
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

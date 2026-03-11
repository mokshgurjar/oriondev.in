import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const result = await sql`
        UPDATE subscribers
        SET active = 0
        WHERE token = ${token}
        RETURNING email
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Invalid token or subscriber not found' }, { status: 404 });
    }

    return new NextResponse(`
      <html style="background:#080404; color:#f0e8e8; font-family:var(--font-ui), sans-serif; text-align:center; padding:10%;">
        <body style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <h2 style="font-family:var(--font-display), serif; font-size: 2rem;">Unsubscribed</h2>
          <p>You have been successfully removed from the Orion IDE newsletter.</p>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

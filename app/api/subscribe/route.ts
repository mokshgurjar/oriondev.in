import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';
import { sendEmail, buildWelcomeEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const token = crypto.randomUUID();

    try {
      await sql`
        INSERT INTO subscribers (email, token, active)
        VALUES (${email}, ${token}, 1)
      `;
    } catch (dbError) {
      if (typeof dbError === 'object' && dbError !== null && 'code' in dbError && (dbError as Record<string, unknown>).code === '23505') {
        const existingRecord = await sql`
          SELECT active FROM subscribers WHERE email = ${email}
        `;

        if (existingRecord.length > 0 && existingRecord[0].active === 1) {
          return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
        } else {
          await sql`
            UPDATE subscribers
            SET active = 1, token = ${token}
            WHERE email = ${email}
          `;
        }
      } else {
        throw dbError;
      }
    }

    const baseUrl = process.env.BASE_URL || 'https://oriondev.in';
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${token}`;
    const html = buildWelcomeEmail(unsubscribeUrl);

    const result = await sendEmail({
      to: email,
      subject: 'Welcome to OrionIDE Newsletter',
      html,
    });

    if (!result.success) {
      console.warn('Welcome email failed to send:', result.error);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });

  } catch (error) {
    console.error('Subscription API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

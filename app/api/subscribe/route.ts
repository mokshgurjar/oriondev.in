import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // Server-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const token = crypto.randomUUID();

    try {
      // Attempt to insert new active subscriber
      await sql`
        INSERT INTO subscribers (email, token, active) 
        VALUES (${email}, ${token}, 1)
      `;
    } catch (dbError) {
      // Postgres unique violation error code is 23505
      if (typeof dbError === 'object' && dbError !== null && 'code' in dbError && (dbError as Record<string, unknown>).code === '23505') {
        const existingRecord = await sql`
            SELECT active FROM subscribers WHERE email = ${email}
        `;

        if (existingRecord.length > 0 && existingRecord[0].active === 1) {
          // Already subscribed and active
           return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
        } else {
            // Reactivate inactive subscription
            await sql`
                UPDATE subscribers 
                SET active = 1, token = ${token} 
                WHERE email = ${email}
            `;
        }
      } else {
         throw dbError; // Rethrow unexpected DB errors
      }
    }

    // Send Welcome Email
    const unsubscribeUrl = `${process.env.BASE_URL}/api/unsubscribe?token=${token}`;
    
    const { error: resendError } = await resend.emails.send({
        from: 'Orion IDE <onboarding@resend.dev>', // Update this verified domain when available
        to: email,
        subject: 'Welcome to Orion IDE Newsletter',
        html: `
            <p>Thank you for subscribing to the Orion IDE newsletter.</p>
            <p>We'll keep you updated with the latest news, features, and tips on building great software.</p>
            <br/>
            <br/>
            <p style="font-size: 11px; color: #666;">
                If you didn't request this or wish to stop receiving emails, you can 
                <a href="${unsubscribeUrl}">unsubscribe here</a>.
        `
    });

    if (resendError) {
      // If Resend fails (e.g. testing limits), we log it but still return success 
      // because the user was successfully added to the database.
      console.warn('Resend Error (Email not sent):', resendError.message);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });

  } catch (error) {
    console.error('Subscription API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

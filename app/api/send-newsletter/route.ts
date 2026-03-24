import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Simple Authorization protection
  const authHeader = req.headers.get('authorization');
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { subject, htmlContent } = await req.json();

    if (!subject || !htmlContent) {
      return NextResponse.json({ error: 'Subject and htmlContent are required' }, { status: 400 });
    }

    // Fetch all active subscribers
    const activeSubscribers = await sql`
        SELECT email, token FROM subscribers WHERE active = 1
    ` as { email: string; token: string }[];

    if (activeSubscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found' }, { status: 200 });
    }

    // Prepare Resend payload mapping each email with their individual unsubscribe token generated statically per user
    const broadcastOptions = activeSubscribers.map((sub) => {
        const unsubscribeUrl = `${process.env.BASE_URL}/api/unsubscribe?token=${sub.token}`;
        return {
            from: 'Orion IDE <onboarding@resend.dev>', // Update when fully deployed
            to: [sub.email],
            subject: subject,
            html: `
                ${htmlContent}
                <hr style="margin-top: 40px; border:none; border-top:1px solid #eaeaea;" />
                <p style="font-size: 11px; color: #666; text-align: center;">
                    You are receiving this because you subscribed to updates from Orion IDE.<br/>
                    <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe safely here</a>.
                </p>
            `
        };
    });

    // Send emails (Warning: Resend Batch has limits. Typically handled via chunks of 100 max)
    const BATCH_SIZE = 100;
    for (let i = 0; i < broadcastOptions.length; i += BATCH_SIZE) {
        const batch = broadcastOptions.slice(i, i + BATCH_SIZE);
        await resend.batch.send(batch);
    }

    return NextResponse.json({ 
        success: true, 
        message: `Newsletter sent successfully to ${activeSubscribers.length} subscribers` 
    }, { status: 200 });

  } catch (error) {
    console.error('Newsletter broadcast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

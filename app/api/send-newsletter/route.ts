import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { buildNewsletterEmail, sendBatchEmails } from '@/lib/email';

export async function POST(req: NextRequest) {
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

    const activeSubscribers = await sql`
      SELECT email, token FROM subscribers WHERE active = 1
    ` as { email: string; token: string }[];

    if (activeSubscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found' }, { status: 200 });
    }

    const baseUrl = process.env.BASE_URL || 'https://oriondev.in';
    const payloads = activeSubscribers.map((sub) => ({
      from: 'OrionIDE <newsletter@oriondev.in>',
      to: [sub.email],
      subject,
      html: buildNewsletterEmail(htmlContent, `${baseUrl}/api/unsubscribe?token=${sub.token}`),
    }));

    const result = await sendBatchEmails(payloads);

    return NextResponse.json({
      success: true,
      sent: result.sent,
      failed: result.failed,
      total: activeSubscribers.length,
      errors: result.errors.length > 0 ? result.errors : undefined,
    }, { status: 200 });

  } catch (error) {
    console.error('Newsletter broadcast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

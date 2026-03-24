import { Resend } from 'resend';

const FROM_ADDRESS = 'OrionIDE <newsletter@oriondev.in>';
const BATCH_SIZE = 100;

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

type BatchEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      console.error('Resend send error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export function buildWelcomeEmail(unsubscribeUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #080404;">
      <div style="background: linear-gradient(135deg, rgba(192,40,42,0.1) 0%, rgba(139,29,29,0.05) 100%); border: 1px solid rgba(192,40,42,0.3); border-radius: 16px; padding: 40px;">
        <h1 style="color: #f0e8e8; font-size: 28px; margin: 0 0 20px 0; font-weight: 300;">Welcome to OrionIDE</h1>
        <p style="color: #a89a9a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Thank you for subscribing to the Orion IDE newsletter.
        </p>
        <p style="color: #a89a9a; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
          We'll keep you updated with the latest news, features, and tips on building great software.
        </p>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 12px; color: #666; margin: 0;">
            You're receiving this because you subscribed to OrionIDE updates.<br/>
            <a href="${unsubscribeUrl}" style="color: #c0282a; text-decoration: underline;">Unsubscribe here</a> if you no longer wish to receive emails.
          </p>
        </div>
      </div>
    </div>
  `;
}

export function buildNewsletterEmail(content: string, unsubscribeUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #080404;">
      <div style="background: linear-gradient(135deg, rgba(192,40,42,0.1) 0%, rgba(139,29,29,0.05) 100%); border: 1px solid rgba(192,40,42,0.3); border-radius: 16px; padding: 40px;">
        ${content}
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 40px;">
          <p style="font-size: 12px; color: #666; margin: 0; text-align: center;">
            You're receiving this because you subscribed to OrionIDE updates.<br/>
            <a href="${unsubscribeUrl}" style="color: #c0282a; text-decoration: underline;">Unsubscribe here</a> if you no longer wish to receive emails.
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function sendBatchEmails(
  payloads: BatchEmailPayload[]
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = { sent: 0, failed: 0, errors: [] as string[] };

  for (let i = 0; i < payloads.length; i += BATCH_SIZE) {
    const batch = payloads.slice(i, i + BATCH_SIZE);

    try {
      const { data, error } = await resend.batch.send(batch);

      if (error) {
        result.failed += batch.length;
        result.errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
        console.error('Resend batch error:', error.message);
      } else {
        result.sent += batch.length;
      }
    } catch (error) {
      result.failed += batch.length;
      result.errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: Unexpected error`);
      console.error('Batch send error:', error);
    }
  }

  return result;
}

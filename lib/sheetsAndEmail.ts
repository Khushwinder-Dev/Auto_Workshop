import nodemailer from "nodemailer";

export type FormType =
  | "1_Workshop_Booking"
  | "2_Price_Quote"
  | "3_Contact_Inquiry"
  | "4_Subscriptions"
  | "5_Chatbot_Leads"
  // Legacy aliases for backward compatibility:
  | "1_Welcome_Popup"
  | "2_Free_Consultation"
  | "3_Subscriptions"
  | "4_Contact_Us"
  | "5_Careers"
  | "6_Technology_Expert"
  | "7_Get_A_Quote";

export interface FormSubmissionPayload {
  formType: FormType;
  title: string;
  data: Record<string, any>;
  fields: Array<{ label: string; value: string | undefined | null }>;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

export function getFormTypeAliases(formType: FormType): string[] {
  switch (formType) {
    case "1_Workshop_Booking":
    case "2_Free_Consultation":
      return ["1_Workshop_Booking", "workshop_booking", "booking", "appointment", "free_consultation", "consultation", "book_slot"];
    case "2_Price_Quote":
    case "7_Get_A_Quote":
      return ["2_Price_Quote", "price_quote", "get_a_quote", "quote", "get_quote", "estimate"];
    case "3_Contact_Inquiry":
    case "4_Contact_Us":
      return ["3_Contact_Inquiry", "contact_inquiry", "4_Contact_Us", "contact_us", "contact", "callback", "enquiry"];
    case "4_Subscriptions":
    case "1_Welcome_Popup":
      return ["4_Subscriptions", "subscriptions", "subscription", "subscribe", "vip_club", "welcome_offer"];
    case "5_Chatbot_Leads":
    case "6_Technology_Expert":
      return ["5_Chatbot_Leads", "chatbot_leads", "chatbot", "chat_lead", "ai_lead"];
    case "5_Careers":
      return ["5_Careers", "careers", "career", "job_application"];
    default:
      return [formType];
  }
}

export function getPrimaryFormKey(formType: FormType): string {
  switch (formType) {
    case "1_Workshop_Booking":
    case "2_Free_Consultation":
      return "workshop_booking";
    case "2_Price_Quote":
    case "7_Get_A_Quote":
      return "price_quote";
    case "3_Contact_Inquiry":
    case "4_Contact_Us":
      return "contact_inquiry";
    case "4_Subscriptions":
    case "1_Welcome_Popup":
      return "subscriptions";
    case "5_Chatbot_Leads":
    case "6_Technology_Expert":
      return "chatbot_leads";
    case "5_Careers":
      return "careers";
    default:
      return formType;
  }
}

export async function sendToGoogleSheet(
  formType: FormType,
  data: Record<string, any>
): Promise<{ success: boolean; message?: string; error?: any }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL is not configured. Skipping Google Sheet sync.");
    return { success: false, message: "Webhook URL not configured" };
  }

  const primaryKey = getPrimaryFormKey(formType);

  const timestampIso = new Date().toISOString();
  const timestampDubai = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const normalizedData: Record<string, any> = { ...data };
  if (data.fullName && !data.name) normalizedData.name = data.fullName;
  if (data.name && !data.fullName) normalizedData.fullName = data.name;
  if (data.phone && !data.phoneNumber) normalizedData.phoneNumber = data.phone;
  if (data.phoneNumber && !data.phone) normalizedData.phone = data.phoneNumber;
  if (data.email && !data.emailAddress) normalizedData.emailAddress = data.email;
  if (data.emailAddress && !data.email) normalizedData.email = data.emailAddress;

  const payload = {
    formType: primaryKey,
    sheetName: formType,
    targetSheet: formType,
    type: primaryKey,
    timestamp: timestampDubai,
    isoTimestamp: timestampIso,
    site: "babalbustan",
    ...normalizedData,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = { raw: responseText };
    }

    console.log(`[GoogleSheetSync] ${formType} sync result:`, parsed);
    return { success: res.ok, message: responseText };
  } catch (err: any) {
    console.error(`[GoogleSheetSync] Error syncing ${formType} to Google Sheets:`, err);
    return { success: false, error: err?.message || err };
  }
}

export async function sendEmailNotification({
  formType,
  title,
  fields,
  attachments,
}: FormSubmissionPayload): Promise<{ success: boolean; error?: any }> {
  const recipient = process.env.NOTIFICATION_EMAIL || "info@babalbustanuae.com";

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn("SMTP credentials not fully configured. Skipping email notification.");
    return { success: false, error: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dubai",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const validFields = fields.filter(
      (f) => f.value !== undefined && f.value !== null && f.value.toString().trim() !== ""
    );

    const rowsHtml = validFields
      .map(
        (f) => `
        <tr>
          <td style="padding: 12px 14px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%; font-size: 13px; vertical-align: top;">
            ${escapeHtml(f.label)}
          </td>
          <td style="padding: 12px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 14px; line-height: 1.5; vertical-align: top;">
            ${formatFieldValue(f.label, f.value)}
          </td>
        </tr>
      `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0c0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c0a09; padding: 30px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="640" style="max-width: 640px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5); border: 1px solid #292524;">
                <tr>
                  <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 26px 30px; text-align: left;">
                    <div style="display: inline-block; background: rgba(0,0,0,0.25); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      ${escapeHtml(formType)}
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; line-height: 1.3;">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px;">
                      Bab Al Bustan Auto Maintenance Workshop • Sharjah Industrial Area 5
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 28px 30px;">
                    <p style="margin: 0 0 18px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      A new customer submission has been received from the website and synced to your Google Sheets tab:
                      <strong style="color: #dc2626;">${escapeHtml(formType)}</strong>.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                      ${rowsHtml}
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 4px; padding: 12px 16px;">
                      <tr>
                        <td style="font-size: 12px; color: #991b1b; line-height: 1.6;">
                          <strong>Submission Time:</strong> ${formattedTime} (GST - UAE)<br/>
                          <strong>Spreadsheet Tab:</strong> ${escapeHtml(formType)}<br/>
                          <strong>Notification Email:</strong> ${escapeHtml(recipient)}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <tr>
                  <td style="background-color: #18181b; padding: 18px 30px; border-top: 1px solid #27272a; text-align: center; font-size: 12px; color: #a1a1aa;">
                    Bab Al Bustan Auto Maintenance Workshop (Sharjah, UAE) — Automated Inquiries & Booking System
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const plainText = `
${title}
Form: ${formType}
Time: ${formattedTime} (UAE GST)
Recipient: ${recipient}
Spreadsheet Sheet: ${formType}

${validFields.map((f) => `${f.label}: ${f.value}`).join("\n")}
    `.trim();

    await transporter.sendMail({
      from: `"Bab Al Bustan Workshop" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `[Bab Al Bustan] ${title}`,
      text: plainText,
      html: htmlContent,
      attachments: attachments || [],
    });

    console.log(`[EmailNotification] Successfully sent notification for ${formType} to ${recipient}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[EmailNotification] Error sending email for ${formType}:`, err);
    return { success: false, error: err?.message || err };
  }
}

export async function processFormSubmission(payload: FormSubmissionPayload): Promise<{
  sheetResult: { success: boolean; message?: string; error?: any };
  emailResult: { success: boolean; error?: any };
}> {
  const [sheetResult, emailResult] = await Promise.all([
    sendToGoogleSheet(payload.formType, payload.data),
    sendEmailNotification(payload),
  ]);

  return { sheetResult, emailResult };
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatFieldValue(label: string, value: any): string {
  if (value === null || value === undefined) return "";
  const str = String(value);

  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("email") && str.includes("@")) {
    return `<a href="mailto:${escapeHtml(str)}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${escapeHtml(str)}</a>`;
  }
  if (lowerLabel.includes("phone")) {
    return `<a href="tel:${escapeHtml(str.replace(/\s+/g, ""))}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${escapeHtml(str)}</a>`;
  }
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return `
      <div>
        <a href="${escapeHtml(str)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; margin-bottom: 6px;">
          View Attachment &rarr;
        </a>
        <br/>
        <a href="${escapeHtml(str)}" target="_blank" rel="noopener noreferrer" style="color: #dc2626; text-decoration: underline; font-size: 11px; word-break: break-all;">
          ${escapeHtml(str)}
        </a>
      </div>
    `;
  }

  return escapeHtml(str).replace(/\n/g, "<br/>");
}

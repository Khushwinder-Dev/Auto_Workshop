/**
 * ======================================================================================
 * BAB AL BUSTAN AUTO MAINTENANCE WORKSHOP — GOOGLE SHEETS & EMAIL AUTOMATION SYSTEM
 * ======================================================================================
 * Spreadsheet Name: BabAlBustan_Forms_Database
 * Owner Notification Emails: babalbustan1@gmail.com, info@babalbustanuae.com
 * Workshop Location: Industrial Area 5, Sharjah, United Arab Emirates
 *
 * Dedicated Sheets (Tabs) & Exact Form Columns:
 *  1. 1_Workshop_Booking    (Appointment bookings, online service reservations)
 *  2. 2_Price_Quote          (Get a quote, price estimates, repair inquiries)
 *  3. 3_Contact_Inquiry      (Contact page messages, general inquiries, callbacks)
 *  4. 4_Subscriptions        (Newsletter subscriptions & VIP updates)
 *  5. 5_Chatbot_Leads        (AI Chatbot customer leads & inquiries)
 * ======================================================================================
 */

const OWNER_EMAILS = ["babalbustan1@gmail.com", "info@babalbustanuae.com"];
const BRAND_RED = "#dc2626";
const BRAND_NAME = "Bab Al Bustan Auto Maintenance Workshop";

// Configuration for each sheet tab with exact headers and matching field aliases
const SHEETS_CONFIG = {
  "1_Workshop_Booking": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone / WhatsApp",
      "Email Address",
      "Vehicle (Make & Model)",
      "Service Requested",
      "Preferred Date",
      "Preferred Time Slot",
      "Customer Notes / Symptoms",
      "Submission Source"
    ],
    aliases: [
      "workshop_booking",
      "booking",
      "appointment",
      "1_workshop_booking",
      "2_free_consultation",
      "consultation",
      "book_slot"
    ]
  },

  "2_Price_Quote": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone / WhatsApp",
      "Email Address",
      "Vehicle Make / Model / Year",
      "Services Requested",
      "Target Timeframe",
      "Preferred Contact Method",
      "Customer Notes / Faults",
      "Submission Source"
    ],
    aliases: [
      "price_quote",
      "quote",
      "get_a_quote",
      "2_price_quote",
      "7_get_a_quote",
      "estimate"
    ]
  },

  "3_Contact_Inquiry": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone Number",
      "Email Address",
      "Subject",
      "Message / Details",
      "Submission Source"
    ],
    aliases: [
      "contact_inquiry",
      "contact",
      "contact_us",
      "3_contact_inquiry",
      "4_contact_us",
      "callback",
      "enquiry"
    ]
  },

  "4_Subscriptions": {
    headers: [
      "Submission Date & Time",
      "Email Address",
      "Submission Source"
    ],
    aliases: [
      "subscriptions",
      "subscription",
      "subscribe",
      "newsletter",
      "4_subscriptions",
      "1_welcome_popup"
    ]
  },

  "5_Chatbot_Leads": {
    headers: [
      "Submission Date & Time",
      "Full Name",
      "Phone Number",
      "Email Address",
      "Initial Question / Message",
      "Platform / Device",
      "Submission Source"
    ],
    aliases: [
      "chatbot_leads",
      "chat_lead",
      "chatbot",
      "ai_lead",
      "5_chatbot_leads",
      "6_technology_expert"
    ]
  }
};

/**
 * Handle incoming POST requests from the website forms
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "No post data received" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = resolveSheetName(payload);

    if (!sheetName || !SHEETS_CONFIG[sheetName]) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "error",
          message: "Unrecognized formType / sheetName: " + (payload.formType || payload.sheetName)
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet(ss, sheetName);
    const rowValues = buildRowValues(sheetName, payload);

    sheet.appendRow(rowValues);

    // Format new row styling
    const lastRow = sheet.getLastRow();
    const numCols = rowValues.length;
    const range = sheet.getRange(lastRow, 1, 1, numCols);
    range.setFontFamily("Segoe UI");
    range.setFontSize(10);
    range.setVerticalAlignment("middle");
    range.setWrap(true);

    // Send instant Gmail notification
    try {
      sendGmailAlert(sheetName, payload);
    } catch (mailErr) {
      Logger.log("Failed to send Gmail alert: " + mailErr.toString());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        sheetName: sheetName,
        row: lastRow,
        timestamp: new Date().toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests for health verification
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      brand: BRAND_NAME,
      version: "2.0.0",
      configuredSheets: Object.keys(SHEETS_CONFIG)
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Determine which sheet should receive the submission
 */
function resolveSheetName(payload) {
  const rawKey = (payload.sheetName || payload.formType || payload.targetSheet || payload.type || "").toString().trim().toLowerCase();

  for (const [sName, config] of Object.entries(SHEETS_CONFIG)) {
    if (sName.toLowerCase() === rawKey) return sName;
    if (config.aliases && config.aliases.some(function(alias) { return alias.toLowerCase() === rawKey; })) {
      return sName;
    }
  }

  // Fallback heuristic based on submitted fields
  if (payload.vehicle || payload.preferredDate || payload.carModel || payload.service) {
    return "1_Workshop_Booking";
  }
  if (payload.timeframe || payload.contactMethod || payload.carDetails) {
    return "2_Price_Quote";
  }
  if (payload.message || payload.subject) {
    return "3_Contact_Inquiry";
  }
  if (payload.email && !payload.name && !payload.phone) {
    return "4_Subscriptions";
  }

  return "1_Workshop_Booking";
}

/**
 * Get or create a sheet tab with formatted headers
 */
function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  const config = SHEETS_CONFIG[sheetName];

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = config.headers;

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(BRAND_RED);
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Segoe UI");
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    headerRange.setWrap(false);
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);

    // Auto-fit column widths
    for (let c = 1; c <= headers.length; c++) {
      sheet.setColumnWidth(c, 180);
    }
  }

  return sheet;
}

/**
 * Build row array matching the exact sheet columns
 */
function buildRowValues(sheetName, data) {
  const timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH:mm:ss 'GST'");
  const source = data.source || data.formSource || "Website Direct";

  const name = data.name || data.fullName || data.customerName || "";
  const phone = data.phone || data.phoneNumber || data.whatsapp || "";
  const email = data.email || data.emailAddress || "";
  const vehicle = data.vehicle || data.carModel || data.car || data.vehicleMake || "";
  const service = data.service || data.services || data.serviceNeeded || data.subject || "";
  const message = data.message || data.notes || data.issue || data.comments || "";

  switch (sheetName) {
    case "1_Workshop_Booking":
      return [
        timestamp,
        name,
        phone,
        email,
        vehicle,
        service || "General Workshop Inspection",
        data.preferredDate || data.date || "Not specified",
        data.preferredTime || data.timeSlot || data.time || "Not specified",
        message,
        source
      ];

    case "2_Price_Quote":
      return [
        timestamp,
        name,
        phone,
        email,
        vehicle,
        service || "Custom Quote Request",
        data.timeframe || data.urgency || "As soon as possible",
        data.contactMethod || "Phone / WhatsApp",
        message,
        source
      ];

    case "3_Contact_Inquiry":
      return [
        timestamp,
        name,
        phone,
        email,
        data.subject || "General Inquiry",
        message,
        source
      ];

    case "4_Subscriptions":
      return [
        timestamp,
        email,
        source
      ];

    case "5_Chatbot_Leads":
      return [
        timestamp,
        name || "Anonymous Chat Visitor",
        phone,
        email,
        data.initialQuery || data.query || message || "AI Chatbot Conversation",
        data.platform || "Web",
        source
      ];

    default:
      return [timestamp, name, phone, email, message, source];
  }
}

/**
 * Send an instant HTML email notification via Gmail
 */
function sendGmailAlert(sheetName, data) {
  const timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH:mm:ss 'GST'");
  const name = data.name || data.fullName || data.customerName || "Valued Customer";
  const phone = data.phone || data.phoneNumber || data.whatsapp || "Not provided";
  const email = data.email || data.emailAddress || "Not provided";
  const vehicle = data.vehicle || data.carModel || "";
  const service = data.service || data.subject || "";

  let title = "New Website Lead";
  if (sheetName === "1_Workshop_Booking") title = "🚗 New Workshop Booking Request";
  else if (sheetName === "2_Price_Quote") title = "💰 New Repair Quote Request";
  else if (sheetName === "3_Contact_Inquiry") title = "📩 New Contact Us Inquiry";
  else if (sheetName === "4_Subscriptions") title = "⭐ New Newsletter Subscriber";
  else if (sheetName === "5_Chatbot_Leads") title = "🤖 New AI Chatbot Lead";

  const emailSubject = `[BAB AL BUSTAN] ${title}: ${name} (${phone})`;

  const fieldsList = [
    { label: "Form Type", value: sheetName },
    { label: "Date & Time (GST)", value: timestamp },
    { label: "Customer Name", value: name },
    { label: "Phone / WhatsApp", value: phone },
    { label: "Email Address", value: email }
  ];

  if (vehicle) fieldsList.push({ label: "Vehicle / Car", value: vehicle });
  if (service) fieldsList.push({ label: "Service / Subject", value: service });
  if (data.preferredDate) fieldsList.push({ label: "Preferred Date", value: data.preferredDate });
  if (data.preferredTime) fieldsList.push({ label: "Preferred Time", value: data.preferredTime });
  if (data.message || data.notes) fieldsList.push({ label: "Customer Notes", value: data.message || data.notes });

  let rowsHtml = "";
  for (let i = 0; i < fieldsList.length; i++) {
    const f = fieldsList[i];
    rowsHtml += `
      <tr>
        <td style="padding: 10px 14px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%; font-size: 13px;">${f.label}</td>
        <td style="padding: 10px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${f.value}</td>
      </tr>
    `;
  }

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin: 0; padding: 20px; background-color: #0c0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.5px;">BAB AL BUSTAN AUTO MAINTENANCE</h1>
          <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.95;">${title}</p>
        </div>
        <div style="padding: 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            ${rowsHtml}
          </table>
          <div style="margin-top: 24px; text-align: center;">
            <a href="tel:${phone.replace(/[^0-9+]/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #dc2626; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; margin-right: 10px;">📞 Call Customer</a>
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px;">💬 Chat on WhatsApp</a>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Industrial Area 5, Sharjah, UAE • Hotline: +971 56 440 6456
        </div>
      </div>
    </body>
    </html>
  `;

  for (let i = 0; i < OWNER_EMAILS.length; i++) {
    try {
      MailApp.sendEmail({
        to: OWNER_EMAILS[i],
        subject: emailSubject,
        htmlBody: htmlBody
      });
    } catch (err) {
      Logger.log("MailApp error for " + OWNER_EMAILS[i] + ": " + err.toString());
    }
  }
}

/**
 * Initialize all sheets immediately when run manually from the Apps Script editor
 */
function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (const sheetName of Object.keys(SHEETS_CONFIG)) {
    getOrCreateSheet(ss, sheetName);
  }
  SpreadsheetApp.flush();
}

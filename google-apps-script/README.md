# Bab Al Bustan Auto Maintenance — Google Sheets & Gmail Notification Setup

All website forms on **Bab Al Bustan Auto Maintenance** link directly to a central Google Spreadsheet named **`BabAlBustan_Forms_Database`** and send real-time notifications to your Gmail.

---

## 📋 The 5 Dedicated Tabs & Exact Columns

### 1. `1_Workshop_Booking` (Appointments & Service Booking)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `name` |
| C | **Phone / WhatsApp** | `phone` |
| D | **Email Address** | `email` |
| E | **Vehicle (Make & Model)** | `vehicle` (e.g. Nissan Patrol 2021) |
| F | **Service Requested** | `service` (Brakes, AC, Engine, etc.) |
| G | **Preferred Date** | `preferredDate` |
| H | **Preferred Time Slot** | `preferredTime` |
| I | **Customer Notes / Symptoms** | `message` / notes |
| J | **Submission Source** | Homepage / Booking Modal / Booking Page |

---

### 2. `2_Price_Quote` (Get a Quote Page)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `name` |
| C | **Phone / WhatsApp** | `phone` |
| D | **Email Address** | `email` |
| E | **Vehicle Make / Model / Year** | `vehicle` |
| F | **Services Requested** | `services` |
| G | **Target Timeframe** | `timeframe` |
| H | **Preferred Contact Method** | `contactMethod` |
| I | **Customer Notes / Faults** | `message` |
| J | **Submission Source** | Get A Quote Page |

---

### 3. `3_Contact_Inquiry` (Contact Us Page & Callback Forms)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `name` |
| C | **Phone Number** | `phone` |
| D | **Email Address** | `email` |
| E | **Subject** | `subject` |
| F | **Message / Details** | `message` |
| G | **Submission Source** | Contact Us Page |

---

### 4. `4_Subscriptions` (VIP Club & Newsletter Signups)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Email Address** | `email` |
| C | **Submission Source** | Website Newsletter Bar |

---

### 5. `5_Chatbot_Leads` (AI Advisor Chatbot Inquiries)
| Col | Header Name | Website Field |
|:---:|:---|:---|
| A | **Submission Date & Time** | Auto timestamp (UAE GST) |
| B | **Full Name** | `name` |
| C | **Phone Number** | `phone` |
| D | **Email Address** | `email` |
| E | **Initial Question / Message** | User's question or issue |
| F | **Platform / Device** | Mobile / Desktop |
| G | **Submission Source** | Bab Al Bustan AI Chatbot |

---

## 🚀 3-Minute Setup Instructions for Your Gmail Account

1. **Open Google Drive / Google Sheets**:
   - Go to [sheets.new](https://sheets.new) while logged into your Google/Gmail account.
   - Name the spreadsheet: **`BabAlBustan_Forms_Database`**.

2. **Open Apps Script Editor**:
   - In the top menu, click **Extensions** → **Apps Script**.
   - Clear any code in `Code.gs`.
   - Copy the entire contents of [`google-apps-script/Code.gs`](file:///d:/Projects/BabalbustanAutoMaint/google-apps-script/Code.gs) and paste it into the editor.

3. **Initialize the 5 Tabs (Optional but recommended)**:
   - At the top function dropdown, select **`setupAllSheets`**.
   - Click **Run**.
   - If prompted with "Authorization Required", click **Review Permissions** → select your Google account → click **Advanced** → **Go to Untitled project (unsafe)** → **Allow**.
   - Switch back to your Google Sheet: All 5 tabs will now be created with branded red headers!

4. **Deploy as a Web App (Webhook URL)**:
   - In the top right corner of Apps Script, click **Deploy** → **New deployment**.
   - Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
   - Set the settings:
     - **Description**: `Bab Al Bustan Webhook v1`
     - **Execute as**: `Me (your email)`
     - **Who has access**: `Anyone` *(Must be Anyone so your website can send leads)*
   - Click **Deploy**.
   - Copy the **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

5. **Paste the URL in `.env.local`**:
   - Open `.env.local` in this project.
   - Add or update:
     ```env
     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbx.../exec"
     ```
   - Done! Every form submission, booking, quote request, and AI Chatbot lead will automatically populate in your Google Sheet and send an instant Gmail alert!

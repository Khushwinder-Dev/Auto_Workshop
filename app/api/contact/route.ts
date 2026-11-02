import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission, FormType } from "@/lib/sheetsAndEmail";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body: Record<string, any> = {};
    const rawFiles: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (value.size > 0 && value.name) {
            rawFiles.push(value);
          }
        } else {
          body[key] = value;
        }
      }
    } else {
      body = await request.json().catch(() => ({}));
    }

    const {
      fullName,
      phone,
      phoneNumber,
      email,
      emailAddress,
      company,
      companyName,
      description,
      message,
      service,
      projectType,
      projectLocation,
      files: rawBodyFiles,
      offerDetails,
      notes,
    } = body;

    const resolvedName = (fullName || body.name || "").toString().trim();
    const resolvedPhone = (phone || phoneNumber || "").toString().trim();
    const resolvedEmail = (email || emailAddress || "").toString().trim();
    const resolvedCompany = (companyName || company || "").toString().trim();
    const resolvedMessage = (message || notes || description || "").toString().trim();
    const resolvedService = (service || projectType || "").toString().trim();

    if (!resolvedName && !resolvedEmail && !resolvedPhone) {
      return NextResponse.json(
        { error: "Please provide your contact information (name, phone or email)." },
        { status: 400 }
      );
    }

    const resolvedVehicle = (body.vehicle || body.carModel || body.car || "").toString().trim();
    const resolvedDate = (body.date || body.preferredDate || "").toString().trim();
    const resolvedTime = (body.time || body.preferredTime || "").toString().trim();

    let formType: FormType = "3_Contact_Inquiry";
    let title = "New Contact Us Inquiry";

    if (body.formType) {
      const ft = body.formType.toString().trim();
      if (
        ft === "1_Workshop_Booking" ||
        ft === "2_Price_Quote" ||
        ft === "3_Contact_Inquiry" ||
        ft === "4_Subscriptions" ||
        ft === "5_Chatbot_Leads" ||
        ft === "1_Welcome_Popup" ||
        ft === "2_Free_Consultation" ||
        ft === "3_Subscriptions" ||
        ft === "4_Contact_Us" ||
        ft === "5_Careers" ||
        ft === "6_Technology_Expert" ||
        ft === "7_Get_A_Quote"
      ) {
        formType = ft as FormType;
      }
    } else {
      const combined = `${resolvedService} ${resolvedMessage}`.toLowerCase();
      if (combined.includes("booking") || combined.includes("slot") || resolvedDate || resolvedTime) {
        formType = "1_Workshop_Booking";
      } else if (
        combined.includes("quote") ||
        combined.includes("estimate") ||
        rawFiles.length > 0
      ) {
        formType = "2_Price_Quote";
      } else if (combined.includes("chatbot") || combined.includes("chat lead")) {
        formType = "5_Chatbot_Leads";
      } else if (combined.includes("subscription") || combined.includes("newsletter")) {
        formType = "4_Subscriptions";
      }
    }

    switch (formType) {
      case "1_Workshop_Booking":
      case "2_Free_Consultation":
        title = `Workshop Booking: ${resolvedService || "Auto Service"}${resolvedVehicle ? ` (${resolvedVehicle})` : ""} from ${resolvedName}`;
        break;
      case "2_Price_Quote":
      case "7_Get_A_Quote":
        title = `Price Quote Request: ${resolvedService || "Repair Estimate"}${resolvedVehicle ? ` (${resolvedVehicle})` : ""} from ${resolvedName}`;
        break;
      case "5_Chatbot_Leads":
      case "6_Technology_Expert":
        title = `AI Chatbot Consultation Lead from ${resolvedName}`;
        break;
      case "4_Subscriptions":
      case "1_Welcome_Popup":
        title = `VIP Club & Newsletter Subscription from ${resolvedName || resolvedEmail}`;
        break;
      default:
        title = `New Contact Inquiry from ${resolvedName}`;
        break;
    }

    const savedFilesInfo: Array<{
      originalName: string;
      sizeFormatted: string;
      directUrl: string;
      apiUrl: string;
      buffer: Buffer;
      contentType: string;
    }> = [];

    const origin = (() => {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const host = forwardedHost || request.headers.get("host") || "localhost:3000";
      const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      return `${proto}://${host}`;
    })();

    if (rawFiles.length > 0) {
      const quotesDir = path.join(process.cwd(), "public", "uploads", "quotes");
      if (!fs.existsSync(quotesDir)) {
        fs.mkdirSync(quotesDir, { recursive: true });
      }

      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const ext = path.extname(file.name || "").toLowerCase();
        const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
        const cleanCandidate = resolvedName.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 20);
        const timestamp = Date.now();
        const uniqueFileName = `quote_${timestamp}_${i + 1}_${cleanCandidate || cleanBase}${ext}`;
        const filePath = path.join(quotesDir, uniqueFileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        const directUrl = `${origin}/uploads/quotes/${uniqueFileName}`;
        const apiUrl = `${origin}/api/quotes/${uniqueFileName}`;
        const sizeFormatted = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

        savedFilesInfo.push({
          originalName: file.name,
          sizeFormatted,
          directUrl,
          apiUrl,
          buffer,
          contentType: file.type || "application/octet-stream",
        });
      }

      try {
        const indexPath = path.join(quotesDir, "quotes_index.json");
        let quotesIndex: any[] = [];
        if (fs.existsSync(indexPath)) {
          try {
            quotesIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
            if (!Array.isArray(quotesIndex)) quotesIndex = [];
          } catch {
            quotesIndex = [];
          }
        }

        quotesIndex.unshift({
          id: `QUOTE-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          fullName: resolvedName,
          phone: resolvedPhone,
          email: resolvedEmail,
          companyName: resolvedCompany,
          projectType: projectType || resolvedService,
          projectLocation,
          projectDetails: resolvedMessage,
          files: savedFilesInfo.map((f) => ({
            name: f.originalName,
            size: f.sizeFormatted,
            directUrl: f.directUrl,
            apiUrl: f.apiUrl,
          })),
        });

        fs.writeFileSync(indexPath, JSON.stringify(quotesIndex.slice(0, 500), null, 2), "utf-8");
      } catch (logErr) {
        console.warn("Could not log to quotes_index.json:", logErr);
      }
    }

    let filesSummary = "None";
    if (savedFilesInfo.length > 0) {
      filesSummary = savedFilesInfo
        .map((f) => `${f.originalName} (${f.sizeFormatted}): ${f.directUrl}`)
        .join("\n");
    } else if (rawBodyFiles) {
      filesSummary = Array.isArray(rawBodyFiles) ? rawBodyFiles.join(", ") : String(rawBodyFiles);
    }

    const fields = [
      { label: "Customer Name", value: resolvedName },
      { label: "Phone / WhatsApp", value: resolvedPhone },
      { label: "Email Address", value: resolvedEmail },
      { label: "Vehicle / Car Model", value: resolvedVehicle },
      { label: "Service Needed", value: resolvedService },
      { label: "Preferred Booking Date", value: resolvedDate },
      { label: "Preferred Time Slot", value: resolvedTime },
      { label: "Company / Fleet", value: resolvedCompany },
      {
        label: "Uploaded Photos / Files",
        value: savedFilesInfo.length > 0 ? savedFilesInfo.map((f) => f.directUrl).join("\n") : (rawBodyFiles ? String(rawBodyFiles) : undefined),
      },
      { label: "Customer Message / Issue Description", value: resolvedMessage },
    ];

    const sheetData: Record<string, any> = {
      fullName: resolvedName,
      name: resolvedName,
      phone: resolvedPhone,
      phoneNumber: resolvedPhone,
      email: resolvedEmail,
      emailAddress: resolvedEmail,
      vehicle: resolvedVehicle,
      carModel: resolvedVehicle,
      service: resolvedService,
      preferredDate: resolvedDate,
      date: resolvedDate,
      preferredTime: resolvedTime,
      time: resolvedTime,
      companyName: resolvedCompany,
      company: resolvedCompany,
      message: resolvedMessage,
      notes: resolvedMessage,
      enquiry: resolvedMessage,
      files: filesSummary,
      fileNames: savedFilesInfo.map((f) => f.originalName).join(", ") || (rawBodyFiles ? String(rawBodyFiles) : "None"),
      fileLinks: savedFilesInfo.map((f) => f.directUrl).join("\n"),
    };

    const emailAttachments = savedFilesInfo.map((f) => ({
      filename: f.originalName,
      content: f.buffer,
      contentType: f.contentType,
    }));

    const { sheetResult, emailResult } = await processFormSubmission({
      formType,
      title,
      data: sheetData,
      fields,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
    });

    console.log(`[FormSubmission] Processed ${formType}:`, {
      sheetSync: sheetResult.success,
      emailNotification: emailResult.success,
      filesSaved: savedFilesInfo.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
        formType,
        uploadedFiles: savedFilesInfo.map((f) => ({
          name: f.originalName,
          size: f.sizeFormatted,
          url: f.directUrl,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to process form submission. Please try again later." },
      { status: 500 }
    );
  }
}

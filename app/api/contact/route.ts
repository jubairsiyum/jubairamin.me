import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanityClient } from "@/lib/sanity.client";

// Rate limiting store (in-memory, use Redis in production)
const submissionStore = new Map<string, number>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const entries = Array.from(submissionStore.entries());
  for (const [ip, timestamp] of entries) {
    if (timestamp < oneDayAgo) {
      submissionStore.delete(ip);
    }
  }
}, 60 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    // Get IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // Check if IP has already submitted
    if (submissionStore.has(ip)) {
      return NextResponse.json(
        { error: "You have already submitted a contact request. Please wait 24 hours before submitting again." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, company, inquiryType, budget, timeline, message } = body;

    // Validation
    if (!name || !email || !inquiryType) {
      return NextResponse.json(
        { error: "Name, email, and inquiry type are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Save to Sanity
    try {
      await sanityClient.create({
        _type: "contact",
        name,
        email,
        company: company || null,
        inquiryType,
        budget: budget || null,
        timeline: timeline || null,
        message: message || null,
        ipAddress: ip,
        userAgent,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    } catch (sanityError) {
      console.error("Sanity error:", sanityError);
      // Continue even if Sanity fails - we still want to send email
    }

    // Send email notification
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

      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #18181b; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h1>
            
            <div style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 20px 0;">
              <h2 style="color: #3b82f6; font-size: 18px; margin: 0 0 10px 0;">Contact Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
              ${company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>` : ""}
            </div>

            <div style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0;">
              <h2 style="color: #10b981; font-size: 18px; margin: 0 0 10px 0;">Inquiry Details</h2>
              <p style="margin: 8px 0;"><strong>Type:</strong> ${inquiryType}</p>
              ${budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${budget}</p>` : ""}
              ${timeline ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline}</p>` : ""}
            </div>

            ${message ? `
            <div style="border-left: 4px solid #8b5cf6; padding-left: 16px; margin: 20px 0;">
              <h2 style="color: #8b5cf6; font-size: 18px; margin: 0 0 10px 0;">Message</h2>
              <p style="margin: 8px 0; white-space: pre-wrap; color: #52525b;">${message}</p>
            </div>
            ` : ""}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #71717a; font-size: 12px;">
              <p style="margin: 4px 0;"><strong>IP Address:</strong> ${ip}</p>
              <p style="margin: 4px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 4px 0;"><strong>User Agent:</strong> ${userAgent}</p>
            </div>
          </div>
          
          <p style="text-align: center; color: #71717a; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form at jubairamin.me
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Contact: ${inquiryType} - ${name}`,
        html: emailBody,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email notification. Please try again later." },
        { status: 500 }
      );
    }

    // Store IP to prevent duplicate submissions
    submissionStore.set(ip, Date.now());

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

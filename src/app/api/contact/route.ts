import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message, center } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message || !center) {
      return NextResponse.json(
        { error: 'Όλα τα υποχρεωτικά πεδία πρέπει να συμπληρωθούν' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Μη έγκυρη διεύθυνση email' },
        { status: 400 }
      );
    }

    // Determine recipient email and SMTP settings based on center
    let recipientEmail = '';
    let smtpUser = '';
    let smtpPass = '';
    
    if (center === 'chalandri') {
      recipientEmail = 'info@alfaschoolchalandri.com';
      smtpUser = 'alfa.chalandri@gmail.com';
      smtpPass = 'prgc cyjj jmof wzwa';
    } else if (center === 'nea-filadelfeia') {
      recipientEmail = 'alfaschoolfiladelfeia@gmail.com';
      smtpUser = 'alfaschoolfiladelfeia@gmail.com';
      smtpPass = 'enor bxvs fskp ydsv';
    }

    // If no recipient email is set, return error
    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Το κέντρο που επιλέξατε δεν είναι διαθέσιμο προς το παρόν' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: recipientEmail,
      subject: `Νέο μήνυμα από ${firstName} ${lastName} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            Νέο μήνυμα από το site
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-top: 0;">Πληροφορίες Επικοινωνίας</h3>
            <p><strong>Όνομα:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Τηλέφωνο:</strong> ${phone}</p>` : ''}
            <p><strong>Κέντρο:</strong> ${center === 'chalandri' ? 'Χαλάνδρι' : 'Νέα Φιλαδέλφεια'}</p>
            <p><strong>Θέμα:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #4f46e5; margin-top: 0;">Μήνυμα</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b;">
            <p>Αυτό το μήνυμα στάλθηκε από το contact form του website Alfa School.</p>
            <p>Ημερομηνία: ${new Date().toLocaleString('el-GR')}</p>
          </div>
        </div>
      `,
      text: `
Νέο μήνυμα από το site

Πληροφορίες Επικοινωνίας:
Όνομα: ${firstName} ${lastName}
Email: ${email}
${phone ? `Τηλέφωνο: ${phone}` : ''}
Κέντρο: ${center === 'chalandri' ? 'Χαλάνδρι' : 'Νέα Φιλαδέλφεια'}
Θέμα: ${subject}

Μήνυμα:
${message}

---
Αυτό το μήνυμα στάλθηκε από το contact form του website Alfa School.
Ημερομηνία: ${new Date().toLocaleString('el-GR')}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Το μήνυμά σας στάλθηκε επιτυχώς!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Υπήρξε ένα σφάλμα κατά την αποστολή του μηνύματος. Παρακαλώ δοκιμάστε ξανά.' },
      { status: 500 }
    );
  }
}

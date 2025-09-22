import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alfa.chalandri@gmail.com',
    pass: 'prgc cyjj jmof wzwa' // App password
  }
})

export async function GET() {
  try {
    // Test email configuration
    await transporter.verify()
    
    return NextResponse.json({
      message: 'Email configuration is working!',
      status: 'success'
    })
  } catch (error) {
    console.error('Email configuration error:', error)
    return NextResponse.json(
      { 
        error: 'Email configuration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    // Send test email
    const testEmail = await transporter.sendMail({
      from: 'alfa.chalandri@gmail.com',
      to: 'admin@acronweb.com', // Test email
      subject: 'Test Email from Alfa Schools',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the Alfa Schools newsletter system.</p>
        <p>If you receive this, the email configuration is working correctly!</p>
      `
    })

    return NextResponse.json({
      message: 'Test email sent successfully!',
      messageId: testEmail.messageId,
      status: 'success'
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import nodemailer from 'nodemailer'

interface NewsletterSubscriber {
  id: string
  email: string
  language: string
  subscribedAt: any
  isActive: boolean
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alfa.chalandri@gmail.com',
    pass: 'prgc cyjj jmof wzwa' // App password
  }
})

export async function POST(request: NextRequest) {
  try {
    const { articleTitle, articleContent, articleImage, articleUrl } = await request.json()

    if (!articleTitle || !articleContent || !articleUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, let's just send a test email to verify the system works
    try {
      const testEmail = await transporter.sendMail({
        from: 'alfa.chalandri@gmail.com',
        to: 'admin@acronweb.com', // Test email
        subject: `🎓 Alfa Schools - ${articleTitle}`,
        html: generateEmailHTML({
          articleTitle,
          articleContent,
          articleImage,
          articleUrl,
          language: 'en'
        })
      })

      console.log('Test email sent successfully:', testEmail.messageId)

      return NextResponse.json({
        message: `Newsletter test sent successfully!`,
        messageId: testEmail.messageId,
        status: 'success'
      })

    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Newsletter sending error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send newsletter',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

function generateEmailHTML({ articleTitle, articleContent, articleImage, articleUrl, language }: {
  articleTitle: string
  articleContent: string
  articleImage?: string
  articleUrl: string
  language: string
}) {
  const isGreek = language === 'el'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${articleTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #81a1d4 0%, #5b7db8 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
          }
          
          .school-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
          }
          
          .school-logo img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            display: block;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
          
          .school-name {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .school-tagline {
            font-size: 14px;
            opacity: 0.9;
            margin: 8px 0 0;
            font-weight: 500;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .article-title {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 20px;
            line-height: 1.3;
          }
          
          .article-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 12px;
            margin: 0 0 25px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }
          
          .article-preview {
            font-size: 16px;
            color: #475569;
            margin: 0 0 30px;
            line-height: 1.6;
          }
          
          .read-more-btn {
            display: inline-block;
            background: linear-gradient(135deg, #81a1d4 0%, #5b7db8 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(129, 161, 212, 0.3);
            transition: all 0.3s ease;
          }
          
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          .footer-text {
            color: #64748b;
            font-size: 14px;
            margin: 0 0 15px;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #475569;
            font-size: 14px;
            text-decoration: none;
          }
          
          .social-links {
            margin: 20px 0 0;
          }
          
          .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #81a1d4;
            text-decoration: none;
            font-weight: 500;
          }
          
          .unsubscribe {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #94a3b8;
          }
          
          .unsubscribe a {
            color: #81a1d4;
            text-decoration: none;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 0;
              border-radius: 0;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .article-title {
              font-size: 20px;
            }
            
            .contact-info {
              flex-direction: column;
              gap: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://i.postimg.cc/0yJ9NVy1/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
            <p class="school-tagline">
              ${isGreek 
                ? 'Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση'
                : 'Together since 1986, with respect, love and dedication to learning'
              }
            </p>
          </div>
          
          <div class="content">
            <h2 class="article-title">${articleTitle}</h2>
            
            ${articleImage ? `
              <img 
                src="${articleImage}" 
                alt="${articleTitle}"
                class="article-image"
              />
            ` : ''}
            
            <div class="article-preview">
              ${articleContent.length > 200 
                ? `${articleContent.substring(0, 200)}...` 
                : articleContent
              }
            </div>
            
            <a href="${articleUrl}" class="read-more-btn">
              ${isGreek ? 'Διαβάστε περισσότερα' : 'Read More'}
            </a>
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Μείνετε συνδεδεμένοι με τα τελευταία νέα μας!'
                : 'Stay connected with our latest news!'
              }
            </p>
            
            <div class="contact-info">
              <a href="tel:+302106800708" class="contact-item">
                📞 +30 210 6800 708
              </a>
              <a href="mailto:info@alfaschoolchalandri.com" class="contact-item">
                ✉️ info@alfaschoolchalandri.com
              </a>
            </div>
            
            <div class="social-links">
              <a href="https://www.facebook.com/profile.php?id=100057649952827" class="social-link">
                Facebook
              </a>
              <a href="https://www.instagram.com/alfaschools/" class="social-link">
                Instagram
              </a>
            </div>
            
            <div class="unsubscribe">
              <p>
                ${isGreek 
                  ? 'Αν δεν θέλετε πλέον να λαμβάνετε αυτά τα emails, ' 
                  : 'If you no longer wish to receive these emails, '
                }
                <a href="#">${isGreek ? 'κάντε unsubscribe εδώ' : 'unsubscribe here'}</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

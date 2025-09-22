import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alfa.chalandri@gmail.com',
    pass: 'prgc cyjj jmof wzwa' // App password
  }
})

interface NewsletterSubscriber {
  id: string
  email: string
  language: string
  subscribedAt: any
  isActive: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { articleTitle, articleContent, articleImage, articleUrl } = await request.json()

    if (!articleTitle || !articleContent || !articleUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Fetching real newsletter subscribers from Firestore...')

    // Get all newsletter subscribers from Firestore
    const subscribersRef = collection(db, 'newsletter_subscribers')
    const q = query(subscribersRef, where('isActive', '==', true))
    const snapshot = await getDocs(q)
    
    const subscribers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsletterSubscriber[]

    console.log(`Found ${subscribers.length} active subscribers:`, subscribers.map(s => s.email))

    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No active subscribers found' },
        { status: 200 }
      )
    }

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      console.log(`Sending email to: ${subscriber.email} (${subscriber.language})`)
      
      const emailHtml = generateEmailHTML({
        articleTitle,
        articleContent,
        articleImage,
        articleUrl,
        language: subscriber.language || 'en'
      })

      const result = await transporter.sendMail({
        from: 'alfa.chalandri@gmail.com',
        to: subscriber.email,
        subject: `🎓 Alfa Schools - ${articleTitle}`,
        html: emailHtml
      })
      
      console.log(`Email sent to ${subscriber.email}:`, result.messageId)
      return result
    })

    const results = await Promise.all(emailPromises)
    console.log('Newsletter sent successfully to all subscribers:', results.length)

    return NextResponse.json({
      message: `Newsletter sent successfully to ${subscribers.length} subscribers`,
      subscribersCount: subscribers.length,
      results: results.map(r => ({ messageId: r.messageId, accepted: r.accepted }))
    })

  } catch (error) {
    console.error('Newsletter sending error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
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
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 650px;
            margin: 20px auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .header {
            background: linear-gradient(135deg, #81a1d4 0%, #5b7db8 50%, #4a6fa5 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          
          .school-logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
          }
          
          .school-logo img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            display: block;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
          
          .school-name {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 32px;
            font-weight: 800;
            margin: 0 0 10px;
            text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
          }
          
          .school-tagline {
            font-size: 16px;
            opacity: 0.95;
            margin: 0 0 15px;
            font-weight: 500;
            position: relative;
            z-index: 1;
          }
          
          .centers-info {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 20px;
            margin-top: 25px;
            backdrop-filter: blur(15px);
            position: relative;
            z-index: 1;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          
          .centers-title {
            font-size: 16px;
            font-weight: 700;
            margin: 0 0 15px;
            opacity: 1;
            text-align: center;
          }
          
          .centers-list {
            display: block;
            width: 100%;
          }
          
          .center-item {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 20px;
            display: block;
            box-sizing: border-box;
          }
          
          .center-item:last-child {
            margin-bottom: 0;
          }
          
          .center-name {
            font-size: 16px;
            font-weight: 700;
            margin: 0 0 10px;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .center-details {
            font-size: 12px;
            opacity: 0.95;
            line-height: 1.4;
          }
          
          .center-details div {
            margin: 5px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
          }
          
          .content {
            padding: 45px 35px;
          }
          
          .article-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
          }
          
          .article-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 16px;
            margin: 0 0 30px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }
          
          .article-preview {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #81a1d4;
          }
          
          .read-more-btn {
            display: inline-block;
            background: linear-gradient(135deg, #81a1d4 0%, #5b7db8 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(129, 161, 212, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
          }
          
          .read-more-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(129, 161, 212, 0.5);
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 35px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          .footer-text {
            color: #64748b;
            font-size: 15px;
            margin: 0 0 20px;
            font-weight: 500;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin: 25px 0;
            flex-wrap: wrap;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #475569;
            font-size: 14px;
            text-decoration: none;
            background: white;
            padding: 12px 18px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .contact-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          .social-links {
            margin-top: 25px;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          
          .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #81a1d4 0%, #5b7db8 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            font-size: 18px;
            transition: all 0.3s ease;
          }
          
          .social-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(129, 161, 212, 0.4);
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .school-logo {
              width: 80px;
              height: 80px;
            }
            
            .school-logo img {
              width: 80px;
              height: 80px;
            }
            
            .content {
              padding: 35px 25px;
            }
            
            .article-title {
              font-size: 24px;
            }
            
            .contact-info {
              flex-direction: column;
              gap: 15px;
            }
            
            .centers-list {
              display: block;
              width: 100%;
            }
            
            .center-item {
              width: 100%;
              margin-bottom: 15px;
              display: block;
            }
            
            .centers-info {
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://i.postimg.cc/gk931X4j/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
            <p class="school-tagline">
              ${isGreek 
                ? 'Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση'
                : 'Together since 1986, with respect, love and dedication to learning'
              }
            </p>
            
            <div class="centers-info">
              <div class="centers-title">
                ${isGreek ? 'Κέντρα μας:' : 'Our Centers:'}
              </div>
              <div class="centers-list">
                <div class="center-item">
                  <div class="center-name">
                    📍 ${isGreek ? 'Χαλάνδρι' : 'Chalandri'}
                  </div>
                  <div class="center-details">
                    <div>📞 +30 210 6800 708</div>
                    <div>✉️ info@alfaschoolchalandri.com</div>
                    <div>📍 ${isGreek ? 'Ρούμελης 27, Χαλάνδρι' : 'Roumelis 27, Chalandri'}</div>
                  </div>
                </div>
                <div class="center-item">
                  <div class="center-name">
                    📍 ${isGreek ? 'Νέα Φιλαδέλφεια' : 'Nea Filadelfeia'}
                  </div>
                  <div class="center-details">
                    <div>📞 +30 210 2777 725</div>
                    <div>✉️ alfaschoolfiladelfeia@gmail.com</div>
                    <div>📍 ${isGreek ? 'Αγίου Γεωργίου 15, Νέα Φιλαδέλφεια' : 'Agiou Georgiou 15, Nea Philadelphia'}</div>
                  </div>
                </div>
              </div>
            </div>
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
              <div class="contact-item">
                🌐 ${isGreek ? 'Επισκεφτείτε μας:' : 'Visit us:'} alfaschools.gr
              </div>
            </div>
            
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🐦</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

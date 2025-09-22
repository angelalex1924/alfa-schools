"use client"

interface EmailTemplateProps {
  articleTitle: string
  articleContent: string
  articleImage?: string
  articleUrl: string
  language: string
}

export default function EmailTemplate({ 
  articleTitle, 
  articleContent, 
  articleImage, 
  articleUrl, 
  language 
}: EmailTemplateProps) {
  const isGreek = language === 'el'
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{articleTitle}</title>
        <style>{`
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
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #81a1d4;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
          
          .read-more-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(129, 161, 212, 0.4);
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
        `}</style>
      </head>
      <body>
        <div className="email-container">
          {/* Header */}
          <div className="header">
            <div className="school-logo">🎓</div>
            <h1 className="school-name">Alfa Schools</h1>
            <p className="school-tagline">
              {isGreek 
                ? 'Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση'
                : 'Together since 1986, with respect, love and dedication to learning'
              }
            </p>
          </div>
          
          {/* Content */}
          <div className="content">
            <h2 className="article-title">{articleTitle}</h2>
            
            {articleImage && (
              <img 
                src={articleImage} 
                alt={articleTitle}
                className="article-image"
              />
            )}
            
            <div className="article-preview">
              {articleContent.length > 200 
                ? `${articleContent.substring(0, 200)}...` 
                : articleContent
              }
            </div>
            
            <a href={articleUrl} className="read-more-btn">
              {isGreek ? 'Διαβάστε περισσότερα' : 'Read More'}
            </a>
          </div>
          
          {/* Footer */}
          <div className="footer">
            <p className="footer-text">
              {isGreek 
                ? 'Μείνετε συνδεδεμένοι με τα τελευταία νέα μας!'
                : 'Stay connected with our latest news!'
              }
            </p>
            
            <div className="contact-info">
              <a href="tel:+302106800708" className="contact-item">
                📞 +30 210 6800 708
              </a>
              <a href="mailto:info@alfaschoolchalandri.com" className="contact-item">
                ✉️ info@alfaschoolchalandri.com
              </a>
            </div>
            
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=100057649952827" className="social-link">
                Facebook
              </a>
              <a href="https://www.instagram.com/alfaschools/" className="social-link">
                Instagram
              </a>
            </div>
            
            <div className="unsubscribe">
              <p>
                {isGreek 
                  ? 'Αν δεν θέλετε πλέον να λαμβάνετε αυτά τα emails, ' 
                  : 'If you no longer wish to receive these emails, '
                }
                <a href="#">{isGreek ? 'κάντε unsubscribe εδώ' : 'unsubscribe here'}</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

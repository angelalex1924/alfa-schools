import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const { 
      templateId, 
      customization,
      preview = false 
    } = await request.json()

    if (!templateId || !customization) {
      return NextResponse.json(
        { error: 'Missing required fields: templateId, customization' },
        { status: 400 }
      )
    }

    // Generate email HTML with custom styling
    const emailHtml = generateCustomEmailHTML(templateId, customization, {
      title: 'Sample Title',
      message: 'This is a sample message to preview your template customization.',
      additionalInfo: 'Additional information can be added here.',
      actionText: 'Learn More',
      actionUrl: '#',
      language: 'el'
    })

    return NextResponse.json({
      html: emailHtml,
      template: templateId,
      status: 'preview'
    })

  } catch (error) {
    console.error('Template preview generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate template preview',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function generateCustomEmailHTML(templateId: string, customization: any, content: any): string {
  const isGreek = content.language === 'el'
  
  // Generate custom CSS based on customization
  const customCSS = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${customization.fonts.heading}:wght@400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=${customization.fonts.body}:wght@400;500;600;700&display=swap');
      
      body {
        margin: 0;
        padding: 0;
        font-family: '${customization.fonts.body}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, ${customization.colors.background} 0%, ${customization.colors.background}dd 50%, ${customization.colors.background} 100%);
        line-height: 1.6;
      }
      
      .email-container {
        max-width: 650px;
        margin: 20px auto;
        background: white;
        border-radius: ${customization.layout.borderRadius};
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .header {
        background: linear-gradient(135deg, ${customization.colors.primary} 0%, ${customization.colors.secondary} 50%, ${customization.colors.accent} 100%);
        padding: ${customization.layout.padding};
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
      }
      
      .school-logo {
        width: ${customization.logo.size};
        height: ${customization.logo.size};
        margin: 0 auto ${customization.layout.spacing};
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
      }
      
      .school-logo img {
        width: ${customization.logo.size};
        height: ${customization.logo.size};
        object-fit: contain;
        display: block;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
      }
      
      .school-name {
        font-family: '${customization.fonts.heading}', 'Inter', sans-serif;
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
      
      .content {
        padding: ${customization.layout.padding};
      }
      
      .template-title {
        font-family: '${customization.fonts.heading}', 'Inter', sans-serif;
        font-size: 28px;
        font-weight: 700;
        color: ${customization.colors.text};
        margin: 0 0 ${customization.layout.spacing};
        line-height: 1.2;
        letter-spacing: -0.3px;
        text-align: center;
      }
      
        .template-message {
          font-size: 17px;
          color: #475569;
          margin: 0 0 35px;
          line-height: 1.7;
          background: ${customization.colors.background};
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid ${customization.colors.primary};
        }
        
        .seasonal-icons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
          font-size: 24px;
        }
        
        .seasonal-decoration {
          position: absolute;
          font-size: 20px;
          opacity: 0.3;
          pointer-events: none;
        }
        
        .seasonal-decoration.top-left { top: 10px; left: 10px; }
        .seasonal-decoration.top-right { top: 10px; right: 10px; }
        .seasonal-decoration.bottom-left { bottom: 10px; left: 10px; }
        .seasonal-decoration.bottom-right { bottom: 10px; right: 10px; }
      
      .action-btn {
        display: inline-block;
        background: linear-gradient(135deg, ${customization.colors.primary} 0%, ${customization.colors.secondary} 100%);
        color: white;
        padding: 16px 32px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 6px 20px ${customization.colors.primary}40;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        font-family: '${customization.fonts.heading}', 'Inter', sans-serif;
        text-align: center;
        margin: 20px 0;
      }
      
      .footer {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        padding: ${customization.layout.padding};
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }
      
      .footer-text {
        color: #64748b;
        font-size: 15px;
        margin: 0 0 20px;
        font-weight: 500;
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
        
        .template-title {
          font-size: 24px;
        }
      }
    </style>
  `

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        ${customCSS}
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo.png" alt="Alfa Schools Logo" />
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
            <h2 class="template-title">${content.title}</h2>
            ${customization.seasonal.icons.length > 0 ? `
              <div class="seasonal-icons">
                ${customization.seasonal.icons.map((icon: string) => `<span>${icon}</span>`).join('')}
              </div>
            ` : ''}
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Ευχαριστούμε που επιλέξατε το Alfa Schools!'
                : 'Thank you for choosing Alfa Schools!'
              }
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

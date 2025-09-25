export interface EmailTemplate {
  id: string
  name: string
  subject: string
  description: string
  category: 'announcement' | 'event' | 'academic' | 'general'
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Καλώς Ήρθατε',
    subject: 'Καλώς ήρθατε στο Alfa Schools!',
    description: 'Template για νέους μαθητές και γονείς',
    category: 'announcement'
  },
  {
    id: 'exam-reminder',
    name: 'Υπενθύμιση Εξετάσεων',
    subject: 'Υπενθύμιση: Προσεχείς Εξετάσεις',
    description: 'Template για υπενθυμίσεις εξετάσεων',
    category: 'academic'
  },
  {
    id: 'event-invitation',
    name: 'Πρόσκληση Εκδήλωσης',
    subject: 'Πρόσκληση σε Εκδήλωση',
    description: 'Template για προσκλήσεις εκδηλώσεων',
    category: 'event'
  },
  {
    id: 'holiday-greeting',
    name: 'Ευχές Γιορτών',
    subject: 'Ευχές Γιορτών από το Alfa Schools',
    description: 'Template για ευχές γιορτών',
    category: 'general'
  },
  {
    id: 'academic-update',
    name: 'Ακαδημαϊκή Ενημέρωση',
    subject: 'Ακαδημαϊκή Ενημέρωση',
    description: 'Template για ακαδημαϊκές ενημερώσεις',
    category: 'academic'
  },
  // Seasonal Templates
  {
    id: 'christmas-template',
    name: 'Χριστουγεννιάτικο Template',
    subject: 'Καλά Χριστούγεννα από το Alfa Schools! 🎄',
    description: 'Χριστουγεννιάτικο template με εικονίδια και χρώματα',
    category: 'general'
  },
  {
    id: 'halloween-template',
    name: 'Halloween Template',
    subject: 'Καλό Halloween από το Alfa Schools! 🎃',
    description: 'Halloween template με εικονίδια και χρώματα',
    category: 'general'
  },
  {
    id: 'easter-template',
    name: 'Πασχαλινό Template',
    subject: 'Καλό Πάσχα από το Alfa Schools! 🐰',
    description: 'Πασχαλινό template με εικονίδια και χρώματα',
    category: 'general'
  },
  {
    id: 'summer-template',
    name: 'Καλοκαιρινό Template',
    subject: 'Καλό Καλοκαίρι από το Alfa Schools! ☀️',
    description: 'Καλοκαιρινό template με εικονίδια και χρώματα',
    category: 'general'
  },
  {
    id: 'carnival-template',
    name: 'Αποκριάτικο Template',
    subject: 'Καλές Απόκριες από το Alfa Schools! 🎭',
    description: 'Αποκριάτικο template με εικονίδια και χρώματα',
    category: 'general'
  }
]

export function generateEmailHTML(templateId: string, content: {
  title: string
  message: string
  additionalInfo?: string
  actionText?: string
  actionUrl?: string
  language?: string
}): string {
  const isGreek = content.language === 'el'
  
  const templates = {
    welcome: generateWelcomeTemplate(content, isGreek),
    'exam-reminder': generateExamReminderTemplate(content, isGreek),
    'event-invitation': generateEventInvitationTemplate(content, isGreek),
    'holiday-greeting': generateHolidayGreetingTemplate(content, isGreek),
    'academic-update': generateAcademicUpdateTemplate(content, isGreek),
    // Seasonal Templates
    'christmas-template': generateChristmasTemplate(content, isGreek),
    'halloween-template': generateHalloweenTemplate(content, isGreek),
    'easter-template': generateEasterTemplate(content, isGreek),
    'summer-template': generateSummerTemplate(content, isGreek),
    'carnival-template': generateCarnivalTemplate(content, isGreek)
  }
  
  return templates[templateId as keyof typeof templates] || templates.welcome
}

function generateWelcomeTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
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
          
          .content {
            padding: 45px 35px;
          }
          
          .welcome-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .welcome-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #81a1d4;
          }
          
          .action-btn {
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
            text-align: center;
            margin: 20px 0;
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
            
            .welcome-title {
              font-size: 24px;
            }
          }
        </style>
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
            <h2 class="welcome-title">${content.title}</h2>
            <div class="welcome-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="welcome-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Ευχαριστούμε που επιλέξατε το Alfa Schools για την εκπαίδευση του παιδιού σας!'
                : 'Thank you for choosing Alfa Schools for your child\'s education!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateExamReminderTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%);
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
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
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
          
          .content {
            padding: 45px 35px;
          }
          
          .exam-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .exam-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #fef3c7;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #f59e0b;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 35px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 35px 25px;
            }
            
            .exam-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
          </div>
          
          <div class="content">
            <h2 class="exam-title">${content.title}</h2>
            <div class="exam-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="exam-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Δείτε Λεπτομέρειες' : 'View Details')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p style="color: #64748b; font-size: 15px; margin: 0 0 15px;">
              ${isGreek 
                ? 'Καλή επιτυχία στις εξετάσεις!'
                : 'Good luck with your exams!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateEventInvitationTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
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
            background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
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
          
          .content {
            padding: 45px 35px;
          }
          
          .event-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .event-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #f0fdf4;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #10b981;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 35px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 35px 25px;
            }
            
            .event-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
          </div>
          
          <div class="content">
            <h2 class="event-title">${content.title}</h2>
            <div class="event-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="event-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Συμμετοχή' : 'Join Event')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p style="color: #64748b; font-size: 15px; margin: 0;">
              ${isGreek 
                ? 'Περιμένουμε να σας δούμε εκεί!'
                : 'We look forward to seeing you there!'
              }
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateHolidayGreetingTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fef2f2 100%);
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
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
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
          
          .content {
            padding: 45px 35px;
          }
          
          .holiday-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .holiday-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #fef2f2;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #dc2626;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 35px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 35px 25px;
            }
            
            .holiday-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
          </div>
          
          <div class="content">
            <h2 class="holiday-title">${content.title}</h2>
            <div class="holiday-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="holiday-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Δείτε Περισσότερα' : 'View More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p style="color: #64748b; font-size: 15px; margin: 0;">
              ${isGreek 
                ? 'Καλές γιορτές!'
                : 'Happy Holidays!'
              }
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateAcademicUpdateTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
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
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
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
          
          .content {
            padding: 45px 35px;
          }
          
          .academic-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .academic-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: #f0f9ff;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 35px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 35px 25px;
            }
            
            .academic-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo.png" alt="Alfa Schools Logo" />
            </div>
            <h1 class="school-name">Alfa Schools</h1>
          </div>
          
          <div class="content">
            <h2 class="academic-title">${content.title}</h2>
            <div class="academic-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="academic-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Δείτε Λεπτομέρειες' : 'View Details')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p style="color: #64748b; font-size: 15px; margin: 0 0 15px;">
              ${isGreek 
                ? 'Συνεχίζουμε να επενδύουμε στην εκπαίδευση!'
                : 'We continue to invest in education!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Christmas Template
function generateChristmasTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
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
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '🎄 ❄️ 🎅 🎁 ⭐ 🦌 🎄 ❄️ 🎅 🎁 ⭐ 🦌 🎄 ❄️ 🎅 🎁 ⭐ 🦌';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            font-size: 20px;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .content {
            padding: 40px 30px;
          }
          
          .template-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #dc2626;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .template-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #dc2626;
          }
          
          .christmas-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            font-size: 24px;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 30px;
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
            
            .content {
              padding: 35px 25px;
            }
            
            .template-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-christmas-logo.png" alt="Alfa Schools Christmas Logo" />
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
            <div class="christmas-icons">
              <span>🎄</span>
              <span>❄️</span>
              <span>🎅</span>
              <span>🎁</span>
              <span>⭐</span>
              <span>🦌</span>
              <span>🎄</span>
              <span>❄️</span>
            </div>
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Καλά Χριστούγεννα και Ευτυχισμένο το Νέο Έτος!'
                : 'Merry Christmas and Happy New Year!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Halloween Template
function generateHalloweenTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #7c2d12 0%, #92400e 50%, #a16207 100%);
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
            background: linear-gradient(135deg, #7c2d12 0%, #92400e 50%, #a16207 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '🎃 👻 🦇 🕷️ 🕸️ 🧙‍♀️ 🧛‍♂️ 🎃 👻 🦇 🕷️ 🕸️ 🧙‍♀️ 🧛‍♂️ 🎃 👻 🦇 🕷️ 🕸️';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            font-size: 20px;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .content {
            padding: 40px 30px;
          }
          
          .template-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #7c2d12;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .template-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #7c2d12;
          }
          
          .halloween-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            font-size: 24px;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #7c2d12 0%, #92400e 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(124, 45, 18, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 30px;
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
            
            .content {
              padding: 35px 25px;
            }
            
            .template-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo-halloween.png" alt="Alfa Schools Halloween Logo" />
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
            <div class="halloween-icons">
              <span>🎃</span>
              <span>👻</span>
              <span>🦇</span>
              <span>🕷️</span>
              <span>🕸️</span>
              <span>🧙‍♀️</span>
              <span>🧛‍♂️</span>
              <span>🎃</span>
            </div>
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Καλό Halloween από το Alfa Schools!'
                : 'Happy Halloween from Alfa Schools!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Easter Template
function generateEasterTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%);
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
            background: linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '🐰 🥚 🌸 🌷 🦋 🌿 🐣 🌼 🐰 🥚 🌸 🌷 🦋 🌿 🐣 🌼 🐰 🥚 🌸 🌷';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            font-size: 20px;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .content {
            padding: 40px 30px;
          }
          
          .template-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #ec4899;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .template-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #ec4899;
          }
          
          .easter-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            font-size: 24px;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 30px;
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
            
            .content {
              padding: 35px 25px;
            }
            
            .template-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo-easter.png" alt="Alfa Schools Easter Logo" />
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
            <div class="easter-icons">
              <span>🐰</span>
              <span>🥚</span>
              <span>🌸</span>
              <span>🌷</span>
              <span>🦋</span>
              <span>🌿</span>
              <span>🐣</span>
              <span>🌼</span>
            </div>
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Καλό Πάσχα από το Alfa Schools!'
                : 'Happy Easter from Alfa Schools!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Summer Template
function generateSummerTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
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
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '☀️ 🏖️ 🌊 🌴 🍦 🏄‍♂️ 🌺 🦋 ☀️ 🏖️ 🌊 🌴 🍦 🏄‍♂️ 🌺 🦋 ☀️ 🏖️ 🌊 🌴';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            font-size: 20px;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .content {
            padding: 40px 30px;
          }
          
          .template-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #f59e0b;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .template-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #f59e0b;
          }
          
          .summer-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            font-size: 24px;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 30px;
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
            
            .content {
              padding: 35px 25px;
            }
            
            .template-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-summer-logo.png" alt="Alfa Schools Summer Logo" />
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
            <div class="summer-icons">
              <span>☀️</span>
              <span>🏖️</span>
              <span>🌊</span>
              <span>🌴</span>
              <span>🍦</span>
              <span>🏄‍♂️</span>
              <span>🌺</span>
              <span>🦋</span>
            </div>
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Καλό Καλοκαίρι από το Alfa Schools!'
                : 'Happy Summer from Alfa Schools!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Carnival Template
function generateCarnivalTemplate(content: any, isGreek: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
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
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '🎭 🎪 🎨 🎊 🎉 🎈 🎠 🎡 🎭 🎪 🎨 🎊 🎉 🎈 🎠 🎡 🎭 🎪 🎨 🎊';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            font-size: 20px;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .content {
            padding: 40px 30px;
          }
          
          .template-title {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #8b5cf6;
            margin: 0 0 25px;
            line-height: 1.2;
            letter-spacing: -0.3px;
            text-align: center;
          }
          
          .template-message {
            font-size: 17px;
            color: #475569;
            margin: 0 0 35px;
            line-height: 1.7;
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #8b5cf6;
          }
          
          .carnival-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            font-size: 24px;
          }
          
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: 'Outfit', 'Inter', sans-serif;
            text-align: center;
            margin: 20px 0;
          }
          
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 30px;
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
            
            .content {
              padding: 35px 25px;
            }
            
            .template-title {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="school-logo">
              <img src="https://www.alfaschools.gr/alfa-logo-carnival.png" alt="Alfa Schools Carnival Logo" />
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
            <div class="carnival-icons">
              <span>🎭</span>
              <span>🎪</span>
              <span>🎨</span>
              <span>🎊</span>
              <span>🎉</span>
              <span>🎈</span>
              <span>🎠</span>
              <span>🎡</span>
            </div>
            <div class="template-message">
              ${content.message}
            </div>
            ${content.additionalInfo ? `<div class="template-message">${content.additionalInfo}</div>` : ''}
            ${content.actionUrl ? `<a href="${content.actionUrl}" class="action-btn">${content.actionText || (isGreek ? 'Μάθετε Περισσότερα' : 'Learn More')}</a>` : ''}
          </div>
          
          <div class="footer">
            <p class="footer-text">
              ${isGreek 
                ? 'Καλές Απόκριες από το Alfa Schools!'
                : 'Happy Carnival from Alfa Schools!'
              }
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              ${isGreek 
                ? 'Αν δεν θέλετε να λαμβάνετε emails, μπορείτε να' 
                : 'If you no longer wish to receive emails, you can'
              } 
              <a href="https://www.alfaschools.gr/newsletter/unsubscribe" style="color: #94a3b8; text-decoration: none; border-bottom: 1px solid #cbd5e1;">
                ${isGreek ? 'απεγγραφείτε εδώ' : 'unsubscribe here'}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

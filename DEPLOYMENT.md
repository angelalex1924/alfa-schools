# Deployment Guide - Alfa School Articles System

## Firebase Setup

### 1. Firestore Database
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### 2. Environment Variables
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. Firestore Security Rules
The `firestore.rules` file has been created with the following permissions:
- **Articles**: Read access for authenticated users, write access for admins
- **Public Articles**: Read access for published articles
- **Users**: Users can manage their own data
- **Admin**: Authenticated users can access admin documents

### 4. Deploy Rules
```bash
firebase deploy --only firestore:rules
```

## Next.js Deployment

### 1. Build the Application
```bash
npm run build
```

### 2. Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. Deploy to Other Platforms
- **Netlify**: Connect your GitHub repository
- **Railway**: Use the Railway CLI or GitHub integration
- **DigitalOcean App Platform**: Connect your repository

## SEO Configuration

### 1. Sitemap
The sitemap is automatically generated at `/sitemap.xml` and includes:
- Static pages (home, services, contact, etc.)
- Dynamic article pages
- Proper lastModified dates
- Change frequencies and priorities

### 2. Robots.txt
The robots.txt file is generated at `/robots.txt` and:
- Allows all crawlers to access public content
- Blocks admin and API routes
- Points to the sitemap

### 3. Meta Tags
Each article page includes:
- Dynamic title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

## Features Implemented

### ✅ Admin Panel
- **Dashboard**: Clean interface with quick actions
- **Article Creation**: Full-featured form with sections
- **Article Management**: List, edit, delete articles
- **Authentication**: Firebase Auth integration

### ✅ Article System
- **Rich Content**: HTML content support
- **Categories**: Predefined categories (Εκπαίδευση, Γλώσσες, Νέα)
- **Tags**: Multiple tags per article
- **Featured Articles**: Mark articles as featured
- **Breaking News**: Mark urgent articles
- **View Counter**: Track article views
- **Reading Time**: Estimated reading time

### ✅ Public Pages
- **Articles List**: Grid layout with filters
- **Article Detail**: Full article view with meta info
- **SEO Optimized**: Proper meta tags and structure
- **Responsive Design**: Mobile-friendly interface

### ✅ SEO Features
- **Dynamic Sitemap**: Auto-generated with articles
- **Robots.txt**: Proper crawler instructions
- **Meta Tags**: Complete SEO meta information
- **URL Structure**: Clean, SEO-friendly URLs

## Usage Instructions

### 1. Creating Articles
1. Go to `/admin/articles/create`
2. Fill in the basic information (title, excerpt, content)
3. Select category and add tags
4. Set publication date and time
5. Configure article settings (featured, breaking news)
6. Save the article

### 2. Managing Articles
1. Go to `/admin/articles`
2. View all articles in a grid layout
3. Edit, delete, or preview articles
4. See article statistics (views, reading time)

### 3. Public Access
- **All Articles**: `/articles`
- **Individual Article**: `/articles/[slug]`
- **Sitemap**: `/sitemap.xml`
- **Robots**: `/robots.txt`

## Security Considerations

1. **Firestore Rules**: Only authenticated users can create/edit articles
2. **Admin Routes**: Protected by Firebase Auth
3. **Input Validation**: All form inputs are validated
4. **XSS Protection**: HTML content is sanitized

## Performance Optimizations

1. **Image Compression**: Automatic image compression for uploads
2. **Lazy Loading**: Images and content load on demand
3. **Caching**: Static pages are cached
4. **CDN**: Use Vercel's global CDN for fast delivery

## Monitoring

1. **Firebase Analytics**: Track user engagement
2. **Error Logging**: Console errors are logged
3. **Performance**: Monitor Core Web Vitals
4. **SEO**: Use Google Search Console for monitoring

## Backup Strategy

1. **Firestore Export**: Regular database exports
2. **Code Repository**: Version control with Git
3. **Environment Variables**: Secure storage of secrets
4. **Media Files**: Backup uploaded images

## Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types and imports
2. **Firebase Connection**: Verify environment variables
3. **Authentication**: Ensure Firebase Auth is enabled
4. **Permissions**: Check Firestore security rules

### Support
- Check Firebase Console for database issues
- Review Vercel logs for deployment problems
- Use browser dev tools for frontend debugging

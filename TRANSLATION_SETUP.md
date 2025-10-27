# Translation System Setup

Αυτό το σύστημα επιτρέπει την αυτόματη μετάφραση των ελληνικών άρθρων στα γαλλικά και αγγλικά χρησιμοποιώντας το Google Translate API.

## Ρύθμιση

### 1. Google Translate API Key

1. Πηγαίνετε στο [Google Cloud Console](https://console.cloud.google.com/)
2. Δημιουργήστε ένα νέο project ή επιλέξτε υπάρχον
3. Ενεργοποιήστε το Cloud Translation API
4. Δημιουργήστε ένα API key από το Credentials section
5. Προσθέστε το API key στο `.env.local`:

```bash
GOOGLE_TRANSLATE_API_KEY=your_api_key_here
```

### 2. Δωρεάν Όρια

Το Google Translate API προσφέρει:
- **2,000,000 χαρακτήρες δωρεάν** κάθε μήνα
- **$20/1M χαρακτήρες** μετά το δωρεάν όριο

Για ένα μέσο άρθρο 1000 λέξεων:
- Ελληνικά: ~6,000 χαρακτήρες
- Μετάφραση σε 2 γλώσσες: ~12,000 χαρακτήρες
- **Μπορείτε να μεταφράσετε ~160 άρθρα δωρεάν κάθε μήνα**

## Χρήση

### Admin Panel

1. Πηγαίνετε στο `/admin/articles`
2. Επιλέξτε ένα άρθρο από τη λίστα
3. Κάντε κλικ στο "Μετάφραση"
4. Επιλέξτε τις γλώσσες που θέλετε να μεταφράσετε
5. Κάντε κλικ "Translate to All Languages"

### Frontend

1. Ανοίξτε ένα άρθρο που έχει μεταφραστεί
2. Θα δείτε ένα language switcher στην κορυφή
3. Επιλέξτε τη γλώσσα που θέλετε να δείτε
4. Το άρθρο θα εμφανιστεί στη γλώσσα που επιλέξατε

## Δομή Δεδομένων

Οι μεταφράσεις αποθηκεύονται στο Firestore με την εξής δομή:

```typescript
{
  translations: {
    "en": {
      title: "Translated Title",
      excerpt: "Translated Excerpt", 
      content: "Translated Content",
      expert: "Translated Expert",
      author: "Translated Author",
      translatedAt: "2024-01-01T00:00:00.000Z",
      translatedBy: "system"
    },
    "fr": {
      // Same structure for French
    }
  }
}
```

## API Endpoints

### POST /api/translate-article

Μεταφράζει ένα άρθρο στις καθορισμένες γλώσσες.

**Request:**
```json
{
  "articleId": "article-id",
  "targetLanguages": ["en", "fr"]
}
```

**Response:**
```json
{
  "success": true,
  "translations": {
    "en": { /* translation data */ },
    "fr": { /* translation data */ }
  },
  "message": "Article translated to en, fr"
}
```

### GET /api/translate-article?articleId=article-id

Επιστρέφει το status των μεταφράσεων για ένα άρθρο.

## Components

### ArticleTranslator
Admin component για τη μετάφραση άρθρων.

### ArticleLanguageSwitcher  
Frontend component για εναλλαγή γλωσσών.

### useTranslatedContent Hook
Hook για λήψη του μεταφρασμένου περιεχομένου.

## Σημειώσεις

- Οι μεταφράσεις δημιουργούνται αυτόματα και μπορεί να απαιτούν επεξεργασία
- Το σύστημα διατηρεί το HTML formatting κατά τη μετάφραση
- Υπάρχει fallback στο αρχικό περιεχόμενο αν δεν υπάρχει μετάφραση
- Οι μεταφράσεις αποθηκεύονται μόνιμα στο Firestore

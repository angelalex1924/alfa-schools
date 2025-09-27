# Slug Suggestions System

Αυτό το σύστημα παρέχει αυτόματες προτάσεις για SEO-friendly slugs στο article form.

## Αρχεία που δημιουργήθηκαν:

### 1. API Endpoint
- **`src/app/api/slug-suggestions/route.ts`** - API endpoint που δημιουργεί προτάσεις slug

### 2. Utilities Library
- **`src/lib/slug-utils.ts`** - Βιβλιοθήκη με συναρτήσεις για μετατροπή ελληνικού κειμένου σε Latin slugs

### 3. React Hook
- **`src/hooks/use-slug-suggestions.ts`** - Custom hook για διαχείριση των προτάσεων

### 4. React Component
- **`src/components/SlugSuggestions.tsx`** - UI component που εμφανίζει τις προτάσεις

### 5. Ενσωμάτωση
- **`src/components/admin/ArticleForm.tsx`** - Ενημερώθηκε για να περιλαμβάνει το SlugSuggestions component

## Πώς λειτουργεί:

1. **Όταν ο χρήστης πληκτρολογεί τίτλο**, το σύστημα:
   - Μετατρέπει ελληνικά γράμματα σε Latin
   - Δημιουργεί πολλαπλές παραλλαγές (βασική, συντομευμένη, με ημερομηνία)
   - Επιστρέφει έως 3 προτάσεις

2. **Ο χρήστης μπορεί να**:
   - Δει τις προτάσεις με validation status
   - Αντιγράψει slug στο clipboard
   - Επιλέξει μια πρόταση με ένα κλικ

3. **Το σύστημα ελέγχει**:
   - Αν το slug είναι έγκυρο (μόνο a-z, 0-9, hyphens)
   - Αν δεν αρχίζει/τελειώνει με hyphen
   - Αν έχει κατάλληλο μήκος (3-100 χαρακτήρες)

## Χαρακτηριστικά:

- ✅ Μετατροπή ελληνικού κειμένου σε Latin
- ✅ Πολλαπλές παραλλαγές slug
- ✅ Real-time validation
- ✅ Copy to clipboard functionality
- ✅ Smooth animations με Framer Motion
- ✅ Responsive design
- ✅ Dark mode support

## Χρήση:

Το SlugSuggestions component εμφανίζεται αυτόματα κάτω από το slug field όταν υπάρχει τίτλος. Δεν χρειάζεται επιπλέον configuration.

# SMTP Configuration για το Contact Form

Το contact form είναι ρυθμισμένο να στέλνει emails μέσω διαφορετικών Gmail accounts ανάλογα με το κέντρο που επιλέγει ο χρήστης.

## Ρυθμίσεις που χρησιμοποιούνται

### Χαλάνδρι
```env
SMTP_USER=alfa.chalandri@gmail.com
SMTP_PASS=prgc cyjj jmof wzwa
RECIPIENT=info@alfaschoolchalandri.com
```

### Νέα Φιλαδέλφεια
```env
SMTP_USER=alfaschoolfiladelfeia@gmail.com
SMTP_PASS=enor bxvs fskp ydsv
RECIPIENT=alfaschoolfiladelfeia@gmail.com
```

## Πώς λειτουργεί

### Χαλάνδρι
1. **Αποστολή**: Τα emails στέλνονται μέσω του `alfa.chalandri@gmail.com`
2. **Παραλαβή**: Τα emails φτάνουν στο `info@alfaschoolchalandri.com`
3. **Forward**: Το Gmail account `alfa.chalandri@gmail.com` πρέπει να έχει ρυθμιστεί να forward τα emails στο `info@alfaschoolchalandri.com`

### Νέα Φιλαδέλφεια
1. **Αποστολή**: Τα emails στέλνονται μέσω του `alfaschoolfiladelfeia@gmail.com`
2. **Παραλαβή**: Τα emails φτάνουν απευθείας στο `alfaschoolfiladelfeia@gmail.com`

## Ρύθμιση Forward στο Gmail

### Για Χαλάνδρι:
1. Πηγαίνετε στο Gmail Settings του `alfa.chalandri@gmail.com`
2. Forwarding and POP/IMAP
3. Προσθέστε το `info@alfaschoolchalandri.com` ως forwarding address

### Για Νέα Φιλαδέλφεια:
Δεν χρειάζεται forwarding - τα emails φτάνουν απευθείας στο `alfaschoolfiladelfeia@gmail.com`

## Άλλοι Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587  # ή 465 για SSL
```

## Δημιουργία του .env.local

1. Δημιουργήστε ένα αρχείο `.env.local` στη ρίζα του project
2. Προσθέστε τις παραπάνω μεταβλητές με τις πραγματικές τιμές σας
3. Κάντε restart το development server

## Σημείωση Ασφαλείας

- **ΜΗΝ** κάνετε commit το `.env.local` στο git
- Το αρχείο `.env.local` είναι ήδη στο `.gitignore`
- Χρησιμοποιήστε πάντα App Passwords αντί για κανονικούς κωδικούς

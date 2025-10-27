import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// Google Translate API configuration
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

interface TranslationRequest {
  articleId: string;
  targetLanguages: string[];
}

interface TranslationResponse {
  translations: {
    [key: string]: {
      title: string;
      excerpt: string;
      content: string;
    };
  };
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    throw new Error('Google Translate API key not configured');
  }

  const response = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLang,
      format: 'html', // Preserve HTML formatting
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.translations[0].translatedText;
}

export async function POST(request: NextRequest) {
  try {
    const { articleId, targetLanguages }: TranslationRequest = await request.json();

    if (!articleId || !targetLanguages || targetLanguages.length === 0) {
      return NextResponse.json(
        { error: 'Article ID and target languages are required' },
        { status: 400 }
      );
    }

    // Get the original article from Firestore
    const articleRef = doc(db, 'articles', articleId);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const articleData = articleSnap.data();
    const translations: { [key: string]: any } = {};

    // Translate to each target language
    for (const targetLang of targetLanguages) {
      try {
        const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
          translateText(articleData.title || '', targetLang),
          translateText(articleData.excerpt || '', targetLang),
          translateText(articleData.content || '', targetLang),
        ]);

        translations[targetLang] = {
          title: translatedTitle,
          excerpt: translatedExcerpt,
          content: translatedContent,
          translatedAt: new Date().toISOString(),
          translatedBy: 'system', // You can add user info later
        };
      } catch (error) {
        console.error(`Translation failed for ${targetLang}:`, error);
        return NextResponse.json(
          { error: `Translation failed for ${targetLang}` },
          { status: 500 }
        );
      }
    }

    // Update the article in Firestore with translations
    await updateDoc(articleRef, {
      translations: translations,
      lastUpdated: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      translations: translations,
      message: `Article translated to ${targetLanguages.join(', ')}`,
    });

  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get translation status for an article
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const articleRef = doc(db, 'articles', articleId);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const articleData = articleSnap.data();
    const translations = articleData.translations || {};

    return NextResponse.json({
      articleId,
      hasTranslations: Object.keys(translations).length > 0,
      availableLanguages: Object.keys(translations),
      translations: translations,
    });

  } catch (error) {
    console.error('Get translation status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Languages, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  translations?: {
    [key: string]: {
      title: string;
      excerpt: string;
      content: string;
      translatedAt: string;
      translatedBy: string;
    };
  };
}

interface ArticleTranslatorProps {
  article: Article;
  onTranslationComplete?: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function ArticleTranslator({ article, onTranslationComplete }: ArticleTranslatorProps) {
  const { t } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStatus, setTranslationStatus] = useState<{
    [key: string]: 'pending' | 'translating' | 'completed' | 'error';
  }>({});
  const [error, setError] = useState<string | null>(null);

  // Check existing translations
  useEffect(() => {
    if (article.translations) {
      const status: { [key: string]: 'completed' } = {};
      Object.keys(article.translations).forEach(lang => {
        status[lang] = 'completed';
      });
      setTranslationStatus(status);
    }
  }, [article.translations]);

  const translateArticle = async (targetLanguages: string[]) => {
    setIsTranslating(true);
    setError(null);
    
    // Update status to show translating
    const newStatus = { ...translationStatus };
    targetLanguages.forEach(lang => {
      newStatus[lang] = 'translating';
    });
    setTranslationStatus(newStatus);

    try {
      const response = await fetch('/api/translate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: article.id,
          targetLanguages: targetLanguages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      // Update status to show completed
      const completedStatus = { ...translationStatus };
      targetLanguages.forEach(lang => {
        completedStatus[lang] = 'completed';
      });
      setTranslationStatus(completedStatus);

      if (onTranslationComplete) {
        onTranslationComplete();
      }

    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'Translation failed');
      
      // Update status to show error
      const errorStatus = { ...translationStatus };
      targetLanguages.forEach(lang => {
        errorStatus[lang] = 'error';
      });
      setTranslationStatus(errorStatus);
    } finally {
      setIsTranslating(false);
    }
  };

  const translateToAll = () => {
    const languagesToTranslate = SUPPORTED_LANGUAGES
      .map(lang => lang.code)
      .filter(lang => translationStatus[lang] !== 'completed');
    
    if (languagesToTranslate.length > 0) {
      translateArticle(languagesToTranslate);
    }
  };

  const translateToLanguage = (languageCode: string) => {
    translateArticle([languageCode]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'translating':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'translating':
        return 'Translating...';
      case 'error':
        return 'Error';
      default:
        return 'Not translated';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Article Translation
        </CardTitle>
        <CardDescription>
          Translate this article to French and English using Google Translate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Article Info */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
        </div>

        {/* Translation Status */}
        <div className="space-y-3">
          <h4 className="font-medium">Translation Status</h4>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <div key={lang.code} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                <Badge variant={translationStatus[lang.code] === 'completed' ? 'default' : 'secondary'}>
                  {getStatusText(translationStatus[lang.code] || 'pending')}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(translationStatus[lang.code] || 'pending')}
                {translationStatus[lang.code] !== 'completed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => translateToLanguage(lang.code)}
                    disabled={isTranslating}
                  >
                    Translate
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={translateToAll}
            disabled={isTranslating || SUPPORTED_LANGUAGES.every(lang => translationStatus[lang.code] === 'completed')}
            className="flex-1"
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Languages className="h-4 w-4 mr-2" />
                Translate to All Languages
              </>
            )}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Translation Preview */}
        {article.translations && Object.keys(article.translations).length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Translation Preview</h4>
            {Object.entries(article.translations).map(([lang, translation]) => {
              const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang);
              return (
                <div key={lang} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{langInfo?.flag}</span>
                    <span className="font-medium">{langInfo?.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {new Date(translation.translatedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-sm mb-1">{translation.title}</h5>
                  <p className="text-xs text-gray-600 line-clamp-2">{translation.excerpt}</p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

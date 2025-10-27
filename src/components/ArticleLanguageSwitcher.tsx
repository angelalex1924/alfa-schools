'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  CheckCircle, 
  Clock, 
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { Article } from '@/lib/types';

interface ArticleLanguageSwitcherProps {
  article: Article;
  onLanguageChange?: (language: string) => void;
}

const LANGUAGE_INFO = {
  el: { name: 'Ελληνικά', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  fr: { name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
};

export default function ArticleLanguageSwitcher({ 
  article, 
  onLanguageChange 
}: ArticleLanguageSwitcherProps) {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const availableLanguages = [
    { code: 'el', ...LANGUAGE_INFO.el },
    ...(article.translations?.en ? [{ code: 'en', ...LANGUAGE_INFO.en }] : []),
    ...(article.translations?.fr ? [{ code: 'fr', ...LANGUAGE_INFO.fr }] : []),
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setCurrentLanguage(languageCode);
    setIsExpanded(false);
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
  };

  const getCurrentContent = () => {
    if (selectedLanguage === 'el') {
      return {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        expert: article.expert,
        author: article.author,
      };
    }

    const translation = article.translations?.[selectedLanguage];
    if (translation) {
      return {
        title: translation.title,
        excerpt: translation.excerpt,
        content: translation.content,
        expert: translation.expert,
        author: translation.author,
      };
    }

    // Fallback to original content
    return {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      expert: article.expert,
      author: article.author,
    };
  };

  const currentContent = getCurrentContent();
  const hasTranslations = article.translations && Object.keys(article.translations).length > 0;

  if (!hasTranslations) {
    return null;
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg text-blue-800">
              Διαθέσιμες Γλώσσες
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription className="text-blue-600">
          Επιλέξτε τη γλώσσα για την εμφάνιση του άρθρου
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {availableLanguages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              const isTranslated = lang.code === 'el' || article.translations?.[lang.code];
              
              return (
                <div
                  key={lang.code}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-100 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <div>
                        <div className="font-medium text-gray-800">
                          {lang.nativeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                      {isTranslated && (
                        <Badge variant="outline" className="text-xs">
                          Διαθέσιμο
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {lang.code !== 'el' && article.translations?.[lang.code] && (
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(article.translations[lang.code].translatedAt).toLocaleDateString('el-GR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.translations[lang.code].translatedBy}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Translation Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <strong>Σημείωση:</strong> Οι μεταφράσεις δημιουργήθηκαν αυτόματα με τη χρήση 
              Google Translate και μπορεί να απαιτούν επεξεργασία για καλύτερη ακρίβεια.
            </div>
          </div>
        </CardContent>
      )}

      {/* Current Language Indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <span className="font-medium">Επιλεγμένη γλώσσα:</span>
          <span className="text-lg">{LANGUAGE_INFO[selectedLanguage as keyof typeof LANGUAGE_INFO]?.flag}</span>
          <span>{LANGUAGE_INFO[selectedLanguage as keyof typeof LANGUAGE_INFO]?.nativeName}</span>
        </div>
      </div>
    </Card>
  );
}

// Hook to get translated content
export function useTranslatedContent(article: Article, language: string) {
  if (language === 'el') {
    return {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      expert: article.expert,
      author: article.author,
    };
  }

  const translation = article.translations?.[language];
  if (translation) {
    return {
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      expert: translation.expert,
      author: translation.author,
    };
  }

  // Fallback to original content
  return {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    expert: article.expert,
    author: article.author,
  };
}

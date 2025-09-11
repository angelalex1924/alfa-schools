"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { getArticleById, updateArticle } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import ArticleForm from '@/components/admin/ArticleForm';

export default function EditArticlePage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && articleId) {
      loadArticle();
    }
  }, [user, articleId]);

  const loadArticle = async () => {
    try {
      setLoadingArticle(true);
      const fetchedArticle = await getArticleById(articleId);
      if (fetchedArticle) {
        setArticle(fetchedArticle);
      } else {
        router.push('/admin/articles');
      }
    } catch (error) {
      console.error('Error loading article:', error);
      router.push('/admin/articles');
    } finally {
      setLoadingArticle(false);
    }
  };

  const handleSave = async (articleData: Partial<Article>) => {
    try {
      setSaving(true);
      await updateArticle(articleId, articleData);
      router.push('/admin/articles');
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Σφάλμα κατά την αποθήκευση του άρθρου');
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Φόρτωση άρθρου...</p>
        </div>
      </div>
    );
  }

  if (!user || !article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Left Section - Back Button & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/articles')}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-lg lg:text-xl font-bold text-slate-800">
                Επεξεργασία Άρθρου
              </h1>
            </div>
            
            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/articles/${article.slug}`)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Προβολή</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ArticleForm
            article={article}
            onSave={handleSave}
            saving={saving}
            mode="edit"
          />
        </motion.div>
      </main>
    </div>
  );
}

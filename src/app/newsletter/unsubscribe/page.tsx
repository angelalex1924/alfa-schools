'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle, XCircle, ArrowLeft, BookOpen, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: t('unsubscribe.success') as string
        })
      } else {
        setResult({
          success: false,
          message: data.error || (t('unsubscribe.error') as string)
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: t('unsubscribe.networkError') as string
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* School-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">📚</div>
        <div className="absolute top-20 right-20 text-5xl">✏️</div>
        <div className="absolute bottom-20 left-20 text-4xl">🎓</div>
        <div className="absolute bottom-10 right-10 text-5xl">📝</div>
        <div className="absolute top-1/2 left-1/4 text-3xl">📖</div>
        <div className="absolute top-1/3 right-1/4 text-4xl">🖊️</div>
      </div>
      
      {/* Notebook lines background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, #e5e7eb 24px, #e5e7eb 25px)',
          backgroundSize: '100% 25px'
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-2 border-blue-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="mx-auto mb-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {t('unsubscribe.title')}
              </CardTitle>
              <p className="text-blue-100 mt-2 text-sm">
                {t('unsubscribe.subtitle')}
              </p>
            </CardHeader>
          
            <CardContent className="p-6">
              {!result ? (
                <form onSubmit={handleUnsubscribe} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      {t('unsubscribe.emailLabel')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('unsubscribe.emailPlaceholder') as string}
                      required
                      className="w-full border-2 border-blue-200 focus:border-blue-500 rounded-lg px-4 py-3 text-lg"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('unsubscribe.processing')}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {t('unsubscribe.button')}
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                    result.success ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {result.success ? (
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? t('unsubscribe.successTitle') : t('unsubscribe.errorTitle')}
                    </h3>
                    <p className={`text-lg ${
                      result.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setResult(null)
                        setEmail('')
                      }}
                      variant="outline"
                      className="flex-1 border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      {t('unsubscribe.newUnsubscribe')}
                    </Button>
                    <Button
                      onClick={() => router.push('/')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t('unsubscribe.homePage')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200">
              <p className="text-sm text-gray-600">
                {t('unsubscribe.resubscribe')}{' '}
                <a href="/" className="text-blue-600 hover:underline font-semibold">
                  {t('unsubscribe.homePage')}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

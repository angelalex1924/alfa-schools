"use client"

import type React from "react"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createArticle, updateArticle, convertImageToBase64 } from "@/lib/firebase-articles"
import { slugify } from "@/lib/utils"
import type { Article, ArticleFormData } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import RichTextEditor from "@/components/RichTextEditor"
import {
  Save,
  X,
  ArrowLeft,
  Tag,
  Plus,
  Trash2,
  Calendar,
  User,
  FileText,
  ImageIcon,
  Layers,
  Star,
  Zap,
  Radio,
  ChevronDown,
  ChevronUp,
  Smile,
  Languages,
  Globe,
} from "lucide-react"

interface ArticleFormProps {
  article?: Article
  initialData?: {
    title?: string
    content?: string
    excerpt?: string
    imageUrl?: string
  }
  onSubmit?: (data: any) => void
  onSave?: (data: any) => void
  saving?: boolean
  mode?: 'create' | 'edit'
}

export default function ArticleForm({ article, initialData = {}, onSubmit, onSave, saving = false, mode = 'create' }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData.title || article?.title || "",
    slug: article?.slug || "",
    excerpt: initialData.excerpt || article?.excerpt || "",
    content: initialData.content || article?.content || "",
    category: article?.category || "Εκπαίδευση",
    image: initialData.imageUrl || article?.image || "",
    imageSource: article?.imageSource || "",
    featured: article?.featured || false,
    breaking: article?.breaking || false,
    showInTicker: article?.showInTicker || false,
    tags: article?.tags && article.tags.length > 0 ? article.tags : [""],
    author: article?.author || "",
    publishDate: (() => {
      const date = new Date()
      const tzoffset = date.getTimezoneOffset() * 60000
      return new Date(date.getTime() - tzoffset).toISOString().slice(0, 16)
    })(),
    viewCount: article?.viewCount || 0,
    readingTime: article?.readingTime || 5,
    expert: article?.expert || "",
    articleImage: article?.articleImage || "",
    titleEn: article?.titleEn || "",
    excerptEn: article?.excerptEn || "",
    contentEn: article?.contentEn || "",
    expertEn: article?.expertEn || "",
    authorEn: article?.authorEn || "",
  })

  const [activeSection, setActiveSection] = useState<string>("basic")
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Initialize form with article data if editing
  useEffect(() => {
    if (article) {
      let publishDate = ""
      try {
        let dateObj: Date
        if (typeof article.date === "string") {
          dateObj = new Date(article.date)
        } else if (article.date && typeof article.date === "object" && 'toDate' in article.date) {
          dateObj = (article.date as any).toDate()
        } else {
          dateObj = new Date()
        }
        const tzoffset = dateObj.getTimezoneOffset() * 60000
        const localISOTime = new Date(dateObj.getTime() - tzoffset).toISOString().slice(0, 16)
        publishDate = localISOTime
      } catch (error) {
        console.error("Error parsing date:", error)
        publishDate = new Date().toISOString().slice(0, 16)
      }

      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content || "",
        category: article.category,
        image: article.image,
        imageSource: article.imageSource || "",
        featured: article.featured,
        breaking: article.breaking,
        showInTicker: article.showInTicker || false,
        tags: article.tags.length > 0 ? article.tags : [""],
        author: article.author || "",
        publishDate: publishDate,
        viewCount: article.viewCount || 0,
        readingTime: article.readingTime || 5,
        expert: article.expert || "",
        articleImage: article.articleImage || "",
        titleEn: article.titleEn || "",
        excerptEn: article.excerptEn || "",
        contentEn: article.contentEn || "",
        expertEn: article.expertEn || "",
        authorEn: article.authorEn || "",
      })
    }
  }, [article])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }))
    }
  }

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData((prev) => ({ ...prev, tags: newTags }))
  }

  const addTagField = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }))
  }

  const removeTagField = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, tags: newTags.length > 0 ? newTags : [""] }))
  }

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }))
    setCategoryDropdownOpen(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const filteredTags = formData.tags.filter((tag) => tag.trim() !== "")
      const inputDate = new Date(formData.publishDate)
      const publishDate = new Date(inputDate.getTime() - inputDate.getTimezoneOffset() * 60000)

      const articleData = {
        ...formData,
        tags: filteredTags,
        publishDate: publishDate.toISOString(),
      }

      if (mode === 'edit' && onSave) {
        onSave(articleData)
      } else {
        if (article) {
          await updateArticle(article.id, articleData)
        } else {
          const newArticle = await createArticle(articleData)
          
          // Send newsletter to subscribers
          try {
            // Use slug instead of ID for the article URL
            const articleSlug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'}/articles/${articleSlug}`
            const response = await fetch('/api/simple-newsletter', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                articleTitle: formData.title,
                articleContent: formData.excerpt || formData.content.substring(0, 200),
                articleImage: formData.image,
                articleUrl: articleUrl
              })
            })
            
            if (response.ok) {
              const result = await response.json()
              console.log('Newsletter sent successfully:', result)
            } else {
              const errorData = await response.json()
              console.error('Failed to send newsletter:', errorData)
              console.error('Error details:', errorData.details)
            }
          } catch (newsletterError) {
            console.error('Newsletter sending error:', newsletterError)
            // Don't block the article creation if newsletter fails
          }
        }
        router.push("/admin/articles")
      }
    } catch (error) {
      console.error("Error saving article:", error)
    } finally {
      setIsSubmitting(false)
    }

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  // Define sections for the form
  const sections = [
    { id: "basic", label: "Βασικές Πληροφορίες", icon: FileText },
    { id: "content", label: "Περιεχόμενο", icon: Layers },
    { id: "meta", label: "Meta & Tags", icon: Tag },
    { id: "settings", label: "Ρυθμίσεις", icon: Star },
  ]

  // Category options
  const categoryOptions = [
    {
      value: "Εκπαίδευση",
      label: "Εκπαίδευση",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      value: "Νέα",
      label: "Νέα",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      value: "Δράσεις",
      label: "Δράσεις",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      value: "Αγγλικά",
      label: "Αγγλικά",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      textColor: "text-red-700 dark:text-red-300",
    },
    {
      value: "Γαλλικά",
      label: "Γαλλικά",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      textColor: "text-indigo-700 dark:text-indigo-300",
    },
    {
      value: "Γλώσσες",
      label: "Γλώσσες",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      borderColor: "border-teal-200 dark:border-teal-800",
      textColor: "text-teal-700 dark:text-teal-300",
    },
  ]

  const selectedCategory = categoryOptions.find((option) => option.value === formData.category) || categoryOptions[0]

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full max-w-none">
      {/* Modern Header with Tabs */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {article ? "Επεξεργασία Άρθρου" : "Δημιουργία Νέου Άρθρου"}
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Πίσω</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition-all disabled:opacity-70 flex items-center gap-1.5 text-sm shadow-sm hover:shadow"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Αποθήκευση...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{article ? "Ενημέρωση" : "Δημοσίευση"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mt-6 flex overflow-x-auto pb-1 gap-1 sm:gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "bg-white dark:bg-gray-700 text-blue-500 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${activeSection === section.id ? "text-blue-500 dark:text-blue-400" : ""}`}
                />
                {section.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 w-full">
        {/* Basic Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeSection === "basic" ? 1 : 0, y: activeSection === "basic" ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={`space-y-6 ${activeSection !== "basic" ? "hidden" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Τίτλος *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                  required
                  placeholder="Εισάγετε τον τίτλο του άρθρου"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug *
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                  required
                  placeholder="url-friendly-title"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  URL-friendly version του τίτλου. Δημιουργείται αυτόματα αλλά μπορεί να επεξεργαστεί.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Κατηγορία *
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border ${
                      categoryDropdownOpen
                        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all`}
                  >
                    <span className={`font-medium ${selectedCategory.textColor}`}>{selectedCategory.label}</span>
                    {categoryDropdownOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 mt-1 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 overflow-hidden"
                      >
                        {categoryOptions.map((option, index) => (
                          <motion.div
                            key={option.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15, delay: index * 0.05 }}
                            onClick={() => handleCategorySelect(option.value)}
                            className={`cursor-pointer px-4 py-2.5 ${
                              option.value === formData.category
                                ? `${option.bgColor} ${option.borderColor} border-l-4`
                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-4 border-transparent"
                            }`}
                          >
                            <span
                              className={`font-medium ${
                                option.value === formData.category
                                  ? option.textColor
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {option.label}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Συγγραφέας</span>
                  </div>
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                  placeholder="Όνομα συγγραφέα (προαιρετικό)"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Το πεδίο συγγραφέα είναι προαιρετικό. Αν αφεθεί κενό, δεν θα εμφανίζεται.
                </p>
              </div>

              <div>
                <label htmlFor="articleImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Εικόνα Άρθρου</span>
                  </div>
                </label>
                <input
                  id="articleImage"
                  name="articleImage"
                  type="url"
                  value={formData.articleImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                  placeholder="URL εικόνας άρθρου (προαιρετικό)"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Εικόνα που εμφανίζεται στο πάνω μέρος του άρθρου. Αν αφεθεί κενό, δεν θα εμφανίζεται.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Χρόνος Ανάγνωσης (λεπτά) *
                  </label>
                  <input
                    id="readingTime"
                    name="readingTime"
                    type="number"
                    min="1"
                    max="60"
                    value={formData.readingTime}
                    onChange={handleNumberChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    required
                    placeholder="5"
                  />
                </div>

                <div>
                  <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Ημερομηνία Δημοσίευσης *</span>
                    </div>
                  </label>
                  <input
                    id="publishDate"
                    name="publishDate"
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Περίληψη *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all resize-none"
              required
              placeholder="Σύντομη περίληψη του άρθρου (1-2 προτάσεις)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Σύντομη περίληψη του άρθρου (1-2 προτάσεις). Εμφανίζεται στις προεπισκοπήσεις άρθρων.
            </p>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeSection === "content" ? 1 : 0, y: activeSection === "content" ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={`space-y-6 w-full ${activeSection !== "content" ? "hidden" : ""}`}
        >
          <div className="w-full">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <div className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Περιεχόμενο Άρθρου *</span>
              </div>
            </label>
            <div className="w-full">
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Γράψτε το περιεχόμενο του άρθρου εδώ..."
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Χρησιμοποιήστε το toolbar για μορφοποίηση κειμένου, εισαγωγή συνδέσμων, εικόνων, videos και πινάκων.
            </p>
          </div>
        </motion.div>

        {/* Meta & Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeSection === "meta" ? 1 : 0, y: activeSection === "meta" ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={`space-y-6 ${activeSection !== "meta" ? "hidden" : ""}`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Tags</span>
              </div>
            </label>
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder="Εισάγετε ένα tag"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeTagField(index)}
                    className="p-2 rounded-lg text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    disabled={formData.tags.length === 1}
                    title="Αφαίρεση tag"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTagField}
                className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mt-2 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Προσθήκη Tag
              </button>
            </div>
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeSection === "settings" ? 1 : 0, y: activeSection === "settings" ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={`space-y-6 ${activeSection !== "settings" ? "hidden" : ""}`}
        >
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ρυθμίσεις Άρθρου</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center h-5">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <label htmlFor="featured" className="font-medium text-gray-700 dark:text-gray-300">
                    Προτεινόμενο Άρθρο
                  </label>
                </div>
                <p className="ml-auto text-sm text-gray-500 dark:text-gray-400">Εμφανίζεται στο carousel</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center h-5">
                  <input
                    id="breaking"
                    name="breaking"
                    type="checkbox"
                    checked={formData.breaking}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <label htmlFor="breaking" className="font-medium text-gray-700 dark:text-gray-300">
                    Σπουδαία Νέα
                  </label>
                </div>
                <p className="ml-auto text-sm text-gray-500 dark:text-gray-400">Σημειώνεται ως επείγον</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center h-5">
                  <input
                    id="showInTicker"
                    name="showInTicker"
                    type="checkbox"
                    checked={formData.showInTicker}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-blue-500" />
                  <label htmlFor="showInTicker" className="font-medium text-gray-700 dark:text-gray-300">
                    Εμφάνιση στο News Ticker
                  </label>
                </div>
                <p className="ml-auto text-sm text-gray-500 dark:text-gray-400">Εμφανίζεται στο scrolling ticker</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer with actions */}
      <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          <span>Ακύρωση</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition-all disabled:opacity-70 flex items-center gap-2 shadow-sm hover:shadow"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Αποθήκευση...
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{mode === 'edit' ? "Ενημέρωση Άρθρου" : "Δημιουργία Άρθρου"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

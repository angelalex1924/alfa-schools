"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Palette, Save, Eye, RotateCcw, ArrowLeft, Download, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TemplateCustomization {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: {
    borderRadius: string
    padding: string
    spacing: string
  }
  logo: {
    size: string
    position: string
  }
  seasonal: {
    theme: string
    icons: string[]
    decorations: string[]
  }
}

export default function TemplateEditorPage() {
  const router = useRouter()
  const [templateId, setTemplateId] = useState('welcome')
  const [availableTemplates, setAvailableTemplates] = useState<any[]>([])
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false)
  const [customization, setCustomization] = useState<TemplateCustomization>({
    id: 'welcome',
    name: 'Welcome Template',
    colors: {
      primary: '#81a1d4',
      secondary: '#5b7db8',
      accent: '#4a6fa5',
      background: '#f0f9ff',
      text: '#1e293b'
    },
    fonts: {
      heading: 'Outfit',
      body: 'Inter'
    },
    layout: {
      borderRadius: '20px',
      padding: '40px',
      spacing: '25px'
    },
    logo: {
      size: '100px',
      position: 'center'
    },
    seasonal: {
      theme: 'none',
      icons: [],
      decorations: []
    }
  })

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Load available templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoadingTemplates(true)
        const response = await fetch('/api/templates')
        const result = await response.json()
        
        if (response.ok) {
          setAvailableTemplates(result.templates)
          console.log('Loaded templates for editor:', result.templates)
        } else {
          console.error('Error loading templates:', result.error)
        }
      } catch (error) {
        console.error('Error fetching templates:', error)
      } finally {
        setIsLoadingTemplates(false)
      }
    }

    loadTemplates()
  }, [])

  const colorPresets = [
    { name: 'Classic Blue', colors: { primary: '#81a1d4', secondary: '#5b7db8', accent: '#4a6fa5' } },
    { name: 'Warm Orange', colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#b45309' } },
    { name: 'Success Green', colors: { primary: '#10b981', secondary: '#059669', accent: '#047857' } },
    { name: 'Elegant Purple', colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' } },
    { name: 'Vibrant Red', colors: { primary: '#dc2626', secondary: '#b91c1c', accent: '#991b1b' } },
    { name: 'Professional Gray', colors: { primary: '#6b7280', secondary: '#4b5563', accent: '#374151' } }
  ]

  const fontOptions = [
    { name: 'Outfit', value: 'Outfit' },
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Lato', value: 'Lato' },
    { name: 'Montserrat', value: 'Montserrat' }
  ]

  const seasonalThemes = [
    { name: 'None', value: 'none', icon: '🎨' },
    { name: 'Christmas', value: 'christmas', icon: '🎄' },
    { name: 'Halloween', value: 'halloween', icon: '🎃' },
    { name: 'Easter', value: 'easter', icon: '🐰' },
    { name: 'Summer', value: 'summer', icon: '☀️' },
    { name: 'Carnival', value: 'carnival', icon: '🎭' }
  ]

  const holidayIcons = {
    christmas: ['🎄', '🎅', '❄️', '🎁', '🌟', '⛄', '🦌', '🔔'],
    halloween: ['🎃', '👻', '🦇', '🕷️', '🕸️', '💀', '🧙‍♀️', '🧛‍♂️'],
    easter: ['🐰', '🥚', '🌸', '🌷', '🦋', '🌿', '🐣', '🌼'],
    summer: ['☀️', '🏖️', '🌊', '🌴', '🍦', '🏄‍♂️', '🌺', '🦋'],
    carnival: ['🎭', '🎪', '🎨', '🎊', '🎉', '🎈', '🎠', '🎡']
  }

  // Load existing customization from Firebase
  useEffect(() => {
    const loadTemplateCustomization = async () => {
      try {
        setIsLoading(true)
        console.log('Loading template customization for:', templateId)
        
        // Find the selected template info
        const selectedTemplate = availableTemplates.find(t => t.id === templateId)
        if (selectedTemplate) {
          setCustomization(prev => ({
            ...prev,
            id: templateId,
            name: selectedTemplate.name
          }))
        }
        
        const response = await fetch(`/api/save-template?templateId=${templateId}`)
        console.log('Response status:', response.status)
        
        const result = await response.json()
        console.log('Response data:', result)

        if (response.ok) {
          if (result.customization) {
            setCustomization(result.customization)
            console.log('Loaded existing customization:', result.customization)
          } else {
            console.log('No existing customization found, using defaults')
            // Set default name from template
            if (selectedTemplate) {
              setCustomization(prev => ({
                ...prev,
                id: templateId,
                name: selectedTemplate.name
              }))
            }
          }
        } else {
          console.error('API Error:', result.error)
          console.log('Using default customization due to API error')
          // Set default name from template
          if (selectedTemplate) {
            setCustomization(prev => ({
              ...prev,
              id: templateId,
              name: selectedTemplate.name
            }))
          }
        }
      } catch (error) {
        console.error('Error loading template customization:', error)
        alert('Error loading template customization. Using default settings.')
      } finally {
        setIsLoading(false)
      }
    }

    if (availableTemplates.length > 0) {
      loadTemplateCustomization()
    }
  }, [templateId, availableTemplates])

  const updateCustomization = (field: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedCustomization = (parent: string, field: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof TemplateCustomization] as any || {}),
        [field]: value
      }
    }))
  }

  const applyColorPreset = (preset: any) => {
    setCustomization(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...preset.colors
      }
    }))
  }

  const generatePreview = async () => {
    try {
      const response = await fetch('/api/generate-template-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId,
          customization,
          preview: true
        })
      })

      const result = await response.json()
      if (response.ok) {
        setPreviewHtml(result.html)
        setIsPreviewMode(true)
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    }
  }

  const saveTemplate = async () => {
    try {
      setIsSaving(true)
      console.log('Saving template:', customization.id)
      console.log('Customization data:', customization)
      
      const response = await fetch('/api/save-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: customization.id,
          customization: customization
        })
      })

      console.log('Save response status:', response.status)
      const result = await response.json()
      console.log('Save response data:', result)

      if (response.ok) {
        alert(`Template "${customization.name}" saved successfully to Firebase!`)
      } else {
        console.error('Save API Error:', result.error)
        alert(`Error saving template: ${result.error}`)
      }
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Error saving template. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const resetToDefault = () => {
    setCustomization({
      id: 'welcome',
      name: 'Welcome Template',
      colors: {
        primary: '#81a1d4',
        secondary: '#5b7db8',
        accent: '#4a6fa5',
        background: '#f0f9ff',
        text: '#1e293b'
      },
      fonts: {
        heading: 'Outfit',
        body: 'Inter'
      },
      layout: {
        borderRadius: '20px',
        padding: '40px',
        spacing: '25px'
      },
      logo: {
        size: '100px',
        position: 'center'
      },
      seasonal: {
        theme: 'none',
        icons: [],
        decorations: []
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                Template Editor
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Customize your email templates with colors, fonts, and seasonal themes
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={generatePreview}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={saveTemplate}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Template'}
            </Button>
            <Button
              onClick={resetToDefault}
              variant="outline"
              className="text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Template Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Select Template to Edit
                    </label>
                    <select
                      value={templateId}
                      onChange={(e) => setTemplateId(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="welcome">Welcome Template (Default)</option>
                      {isLoadingTemplates ? (
                        <option disabled>Loading templates...</option>
                      ) : (
                        availableTemplates.map((template) => (
                          <option key={template.id} value={template.id}>
                            {template.name} - {template.description || 'Custom Template'}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Template Name
                    </label>
                    <Input
                      value={customization.name}
                      onChange={(e) => updateCustomization('name', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Presets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      onClick={() => applyColorPreset(preset)}
                      className="justify-start text-left h-auto p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <span className="text-sm font-medium">{preset.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-20">Primary:</label>
                    <input
                      type="color"
                      value={customization.colors.primary}
                      onChange={(e) => updateNestedCustomization('colors', 'primary', e.target.value)}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={customization.colors.primary}
                      onChange={(e) => updateNestedCustomization('colors', 'primary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-20">Secondary:</label>
                    <input
                      type="color"
                      value={customization.colors.secondary}
                      onChange={(e) => updateNestedCustomization('colors', 'secondary', e.target.value)}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={customization.colors.secondary}
                      onChange={(e) => updateNestedCustomization('colors', 'secondary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-20">Accent:</label>
                    <input
                      type="color"
                      value={customization.colors.accent}
                      onChange={(e) => updateNestedCustomization('colors', 'accent', e.target.value)}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={customization.colors.accent}
                      onChange={(e) => updateNestedCustomization('colors', 'accent', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-20">Background:</label>
                    <input
                      type="color"
                      value={customization.colors.background}
                      onChange={(e) => updateNestedCustomization('colors', 'background', e.target.value)}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={customization.colors.background}
                      onChange={(e) => updateNestedCustomization('colors', 'background', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fonts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Heading Font:</label>
                    <select
                      value={customization.fonts.heading}
                      onChange={(e) => updateNestedCustomization('fonts', 'heading', e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value}>{font.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Body Font:</label>
                    <select
                      value={customization.fonts.body}
                      onChange={(e) => updateNestedCustomization('fonts', 'body', e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value}>{font.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Layout Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-24">Border Radius:</label>
                    <Input
                      value={customization.layout.borderRadius}
                      onChange={(e) => updateNestedCustomization('layout', 'borderRadius', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-24">Padding:</label>
                    <Input
                      value={customization.layout.padding}
                      onChange={(e) => updateNestedCustomization('layout', 'padding', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-24">Spacing:</label>
                    <Input
                      value={customization.layout.spacing}
                      onChange={(e) => updateNestedCustomization('layout', 'spacing', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logo Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Logo Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-16">Size:</label>
                    <Input
                      value={customization.logo.size}
                      onChange={(e) => updateNestedCustomization('logo', 'size', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600 dark:text-slate-400 w-16">Position:</label>
                    <select
                      value={customization.logo.position}
                      onChange={(e) => updateNestedCustomization('logo', 'position', e.target.value)}
                      className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="center">Center</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Themes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seasonal Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {seasonalThemes.map((theme) => (
                      <Button
                        key={theme.value}
                        variant={customization.seasonal.theme === theme.value ? "default" : "outline"}
                        onClick={() => updateNestedCustomization('seasonal', 'theme', theme.value)}
                        className="justify-start text-left h-auto p-4"
                      >
                        <span className="mr-3 text-xl">{theme.icon}</span>
                        <span className="text-sm font-medium">{theme.name}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {customization.seasonal.theme !== 'none' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Holiday Icons
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {holidayIcons[customization.seasonal.theme as keyof typeof holidayIcons]?.map((icon, index) => (
                          <Button
                            key={index}
                            variant={customization.seasonal.icons.includes(icon) ? "default" : "outline"}
                            onClick={() => {
                              const newIcons = customization.seasonal.icons.includes(icon)
                                ? customization.seasonal.icons.filter(i => i !== icon)
                                : [...customization.seasonal.icons, icon]
                              updateNestedCustomization('seasonal', 'icons', newIcons)
                            }}
                            className="h-12 text-2xl"
                          >
                            {icon}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isPreviewMode ? (
                  <div 
                    className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden max-h-[600px] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                    <div className="text-center">
                      <Palette className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-500 dark:text-slate-400">Click "Preview" to see your template</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

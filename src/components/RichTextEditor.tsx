"use client"

import type React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Youtube from "@tiptap/extension-youtube"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { Node } from "@tiptap/core"
import { useState, useRef, useCallback, useEffect } from "react"
import { 
  Bold, 
  Italic, 
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  YoutubeIcon,
  Code,
  Type,
  Smile,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { convertImageToBase64 } from "@/lib/firebase"
// import ImageSizeWarning from "@/components/image-size-warning"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// Create a custom Node for raw HTML
const RawHtmlNode = Node.create({
  name: "rawHtml",
  group: "block",
  atom: true, // Cannot be split or merged

  addAttributes() {
    return {
      content: {
        default: "",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="raw-html"]',
        getAttrs: (element) => {
          const htmlContent = element.getAttribute('data-html-content')
          console.log("RawHtmlNode parseHTML:", element, "Content:", htmlContent)
          return {
            content: htmlContent || ''
          }
        }
      },
    ]
  },

  renderHTML({ node }) {
    // Fix: Don't use content hole (0) in an atom node
    const html: [string, Record<string, any>] = [
      "div",
      {
        "data-type": "raw-html",
        class: "raw-html-container",
        "data-html-content": node.attrs.content,
      },
    ]
    console.log("RawHtmlNode renderHTML:", html, "Content:", node.attrs.content)
    return html
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div")
      dom.classList.add("raw-html-container")
      dom.setAttribute("data-type", "raw-html")
      dom.setAttribute("data-html-content", node.attrs.content)

      // Create a container for the HTML content
      const contentContainer = document.createElement("div")
      contentContainer.classList.add("raw-html-content")
      
      // Decode HTML entities for display
      const decodedContent = node.attrs.content
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&');
      
      contentContainer.innerHTML = decodedContent

      dom.appendChild(contentContainer)

      // Process social media embeds
      setTimeout(() => {
        // Check for Instagram embeds
        if (node.attrs.content.includes("instagram-media")) {
          // Remove existing Instagram scripts to force reload
          const existingScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]')
          existingScripts.forEach(script => script.remove())
          
          const script = document.createElement("script")
          script.async = true
          script.src = "https://www.instagram.com/embed.js"
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process()
              console.log("Instagram embeds processed in editor")
            }
          }
          document.body.appendChild(script)
        }

        // Check for Facebook embeds
        if (
          node.attrs.content.includes("fb-post") ||
          node.attrs.content.includes("fb-video") ||
          node.attrs.content.includes("fb-page") ||
          node.attrs.content.includes("facebook.com/plugins")
        ) {
          if (window.FB) {
            window.FB.XFBML.parse(dom)
          } else {
            const script = document.createElement("script")
            script.id = "facebook-jssdk"
            script.async = true
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0"
            script.crossOrigin = "anonymous"
            script.onload = () => {
              if (window.FB) window.FB.XFBML.parse(dom)
            }
            document.body.appendChild(script)
          }
        }

        // Check for TikTok embeds
        if (node.attrs.content.includes("tiktok.com")) {
          const script = document.createElement("script")
          script.async = true
          script.src = "https://www.tiktok.com/embed.js"
          document.body.appendChild(script)
        }
      }, 100)

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== "rawHtml") return false
          
          // Decode HTML entities for display
          const decodedContent = updatedNode.attrs.content
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&amp;/g, '&');
          
          contentContainer.innerHTML = decodedContent
          dom.setAttribute("data-html-content", updatedNode.attrs.content)

          // Process embeds again on update
          setTimeout(() => {
            if (updatedNode.attrs.content.includes("instagram-media")) {
              // Remove existing Instagram scripts to force reload
              const existingScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]')
              existingScripts.forEach(script => script.remove())
              
              const script = document.createElement("script")
              script.async = true
              script.src = "https://www.instagram.com/embed.js"
              script.onload = () => {
                if (window.instgrm) {
                  window.instgrm.Embeds.process()
                  console.log("Instagram embeds processed in editor update")
                }
              }
              document.body.appendChild(script)
            }
            if (
              updatedNode.attrs.content.includes("fb-post") ||
              updatedNode.attrs.content.includes("fb-video") ||
              updatedNode.attrs.content.includes("fb-page") ||
              updatedNode.attrs.content.includes("facebook.com/plugins")
            ) {
              if (window.FB) window.FB.XFBML.parse(dom)
            }
            if (updatedNode.attrs.content.includes("tiktok.com")) {
              // Reload TikTok script to process new embeds
              const oldScript = document.getElementById("tiktok-embed-script")
              if (oldScript) oldScript.remove()
              const script = document.createElement("script")
              script.id = "tiktok-embed-script"
              script.async = true
              script.src = "https://www.tiktok.com/embed.js"
              document.body.appendChild(script)
            }
          }, 100)

          return true
        },
      }
    }
  },
})

// Declare global types
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
  }
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [showHtmlDialog, setShowHtmlDialog] = useState(false)
  const [htmlContent, setHtmlContent] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Add CSS styles for proper rendering
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
       .ProseMirror ul {
         list-style: none;
         padding-left: 0;
         margin: 0.5em 0;
       }
       .ProseMirror ol {
         list-style: none;
         padding-left: 0;
         margin: 0.5em 0;
         counter-reset: list-counter;
       }
       .ProseMirror li {
         margin: 0.25em 0;
         padding-left: 1.5em;
         position: relative;
         min-height: 1.5em;
       }
       .ProseMirror ul li::before {
         content: "•";
         position: absolute;
         left: 0;
         top: 0;
         width: 1.5em;
         text-align: center;
         color: #000;
         font-weight: bold;
       }
       .ProseMirror ol li::before {
         content: counter(list-counter) ".";
         counter-increment: list-counter;
         position: absolute;
         left: 0;
         top: 0;
         width: 1.5em;
         text-align: center;
         color: #000;
         font-weight: bold;
       }
       .ProseMirror li p {
         margin: 0;
         padding: 0;
         display: block;
         line-height: 1.5;
       }
      .ProseMirror h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.5em 0;
      }
      .ProseMirror h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.5em 0;
      }
      .ProseMirror h3 {
        font-size: 1.25em;
        font-weight: bold;
        margin: 0.5em 0;
      }
      .ProseMirror blockquote {
        border-left: 4px solid #3b82f6;
        padding-left: 1rem;
        font-style: italic;
        margin: 1em 0;
      }
      .raw-html-container {
        display: block;
        width: 100%;
        margin: 1em 0;
        padding: 0.5em;
        text-align: center;
        position: relative;
        min-height: 100px;
        overflow: visible;
      }
      .raw-html-content {
        min-height: 24px;
        width: 100%;
        overflow: visible;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .raw-html-content iframe {
        max-width: 100%;
        min-width: 250px;
      }
      .raw-html-container::before {
        content: 'HTML';
        position: absolute;
        top: -10px;
        left: 10px;
        background: #f0f0f0;
        padding: 0 5px;
        font-size: 10px;
        color: #666;
        border-radius: 3px;
        z-index: 1;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: 'list-disc list-inside',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: 'list-decimal list-inside',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'ml-4',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-blue-500 pl-4 italic",
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
      }),
      Underline,
      TextStyle,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-[#9e86ff] underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Youtube.configure({
        width: 400,
        height: 360,
        nocookie: false,
        HTMLAttributes: {
          class: "w-full max-w-full aspect-video rounded-lg my-4",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      RawHtmlNode,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // Debug: Log the HTML output to see what's being saved
      const html = editor.getHTML()
      console.log("Editor HTML output:", html)
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
    immediatelyRender: false, // Fix for SSR hydration mismatch
  })

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  // Function to load and process social media embeds
  const processSocialEmbeds = useCallback(() => {
    // Process Instagram embeds
    if (document.querySelector(".instagram-media")) {
      console.log("Processing Instagram embeds")
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      } else {
        // Load Instagram SDK if not already loaded
        if (!document.getElementById("instagram-embed-script")) {
          const script = document.createElement("script")
          script.id = "instagram-embed-script"
          script.async = true
          script.src = "//www.instagram.com/embed.js"
          script.onload = () => {
            console.log("Instagram script loaded")
            if (window.instgrm) window.instgrm.Embeds.process()
          }
          document.body.appendChild(script)
        }
      }
    }

    // Process Facebook embeds
    if (document.querySelector(".fb-post, .fb-video, .fb-page")) {
      console.log("Processing Facebook embeds")
      if (window.FB) {
        window.FB.XFBML.parse()
      } else {
        // Load Facebook SDK if not already loaded
        if (!document.getElementById("facebook-jssdk")) {
          const script = document.createElement("script")
          script.id = "facebook-jssdk"
          script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0"
          script.async = true
          script.defer = true
          script.crossOrigin = "anonymous"
          script.onload = () => {
            if (window.FB) window.FB.XFBML.parse()
          }
          document.body.appendChild(script)
        }
      }
    }

    // Process TikTok embeds - βελτιωμένη έκδοση
    if (document.querySelector('blockquote[cite*="tiktok.com"]')) {
      console.log("Processing TikTok embeds")

      // Αφαιρούμε τυχόν υπάρχοντα TikTok scripts για να αναγκάσουμε επαναφόρτωση
      const oldScript = document.getElementById("tiktok-embed-script")
      if (oldScript) {
        oldScript.remove()
      }

      // Προσθέτουμε το TikTok embed script με βελτιωμένο χειρισμό
      const script = document.createElement("script")
      script.id = "tiktok-embed-script"
      script.src = "https://www.tiktok.com/embed.js"
      script.async = true

      // Προσθέτουμε event listener για να επιβεβαιώσουμε τη φόρτωση
      script.onload = () => {
        console.log("TikTok script loaded successfully")

        // Προσθέτουμε μια επιπλέον προσπάθεια επεξεργασίας μετά τη φόρτωση
        setTimeout(() => {
          // Προσθέτουμε ξανά το script για να ενεργοποιήσουμε την επεξεργασία των embeds
          const refreshScript = document.createElement("script")
          refreshScript.async = true
          refreshScript.src = "https://www.tiktok.com/embed.js"
          document.body.appendChild(refreshScript)
        }, 1000)
      }

      // Χειρισμός σφαλμάτων φόρτωσης
      script.onerror = () => {
        console.error("Failed to load TikTok embed script")
        // Προσπαθούμε ξανά με εναλλακτικό URL
        const retryScript = document.createElement("script")
        retryScript.id = "tiktok-embed-script-retry"
        retryScript.async = true
        retryScript.src = "https://sf16-scmcdn-va.ibytedtos.com/goofy/tiktok/web/embed/embed_lib.js"
        document.body.appendChild(retryScript)
      }

      document.body.appendChild(script)
    }
  }, [])

  // Process Instagram embeds when content changes
  useEffect(() => {
    if (editor && value && value.includes('instagram-media')) {
      setTimeout(() => {
        // Αφαιρούμε υπάρχοντα scripts
        const existingScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]')
        existingScripts.forEach(script => script.remove())
        
        // Προσθέτουμε νέο script
        const script = document.createElement('script')
        script.async = true
        script.src = '//www.instagram.com/embed.js'
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process()
          }
        }
        document.body.appendChild(script)
      }, 500)
    }
  }, [editor, value])

  // Process embeds when editor content changes (for edit mode)
  useEffect(() => {
    if (editor) {
      const html = editor.getHTML()
      if (
        html.includes("instagram-media") ||
        html.includes("fb-post") ||
        html.includes("fb-video") ||
        html.includes("fb-page") ||
        html.includes("tiktok.com")
      ) {
        // Αρχική επεξεργασία
        processSocialEmbeds()

        // Πολλαπλές προσπάθειες με αυξανόμενες καθυστερήσεις
        const timers = [
          setTimeout(processSocialEmbeds, 500),
          setTimeout(processSocialEmbeds, 2000),
          setTimeout(processSocialEmbeds, 5000),
        ]

        return () => {
          timers.forEach((timer) => clearTimeout(timer))
        }
      }
    }
  }, [editor, processSocialEmbeds])

  // Add this useEffect to process social media embeds when editor content changes
  useEffect(() => {
    if (editor) {
      const html = editor.getHTML()
      if (
        html.includes("instagram-media") ||
        html.includes("fb-post") ||
        html.includes("fb-video") ||
        html.includes("fb-page") ||
        html.includes("tiktok.com")
      ) {
        // Αρχική επεξεργασία
        processSocialEmbeds()

        // Πολλαπλές προσπάθειες με αυξανόμενες καθυστερήσεις
        const timers = [
          setTimeout(processSocialEmbeds, 500),
          setTimeout(processSocialEmbeds, 2000),
          setTimeout(processSocialEmbeds, 5000),
        ]

        return () => {
          timers.forEach((timer) => clearTimeout(timer))
        }
      }
    }
  }, [editor, processSocialEmbeds])

  // Prevent page scroll on button click
  const handleButtonClick = useCallback(
    (callback: () => void) => (e: React.MouseEvent) => {
      e.preventDefault()
      callback()
      setTimeout(() => {
        editor?.commands.focus()
      }, 0)
    },
    [editor],
  )

  // Handle image upload
  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file || !editor) return

      try {
        setIsUploading(true)
        // Simple base64 conversion
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setPreviewImage(result)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Error uploading image:", error)
        alert("Failed to upload image. Please try a smaller image.")
      } finally {
        setIsUploading(false)
      }
    },
    [editor],
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Insert image from URL or uploaded file
  const insertImage = useCallback(() => {
    if (!editor) return

    const src = previewImage || imageUrl
    if (src) {
      editor
        .chain()
        .focus()
        .setImage({ src, alt: "Image" })
        .run()
    }

    setImageUrl("")
    setPreviewImage(null)
    setShowImageDialog(false)
  }, [editor, imageUrl, previewImage])

  // Insert YouTube video
  const insertYoutube = useCallback(() => {
    if (!editor || !youtubeUrl) return

    let videoId = youtubeUrl
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = youtubeUrl.match(youtubeRegex)

    if (match && match[2].length === 11) {
      videoId = match[2]
    }

    editor.chain().focus().setYoutubeVideo({ src: videoId }).run()
    setYoutubeUrl("")
    setShowYoutubeDialog(false)
  }, [editor, youtubeUrl])

  // Insert link
  const insertLink = useCallback(() => {
    if (!editor || !linkUrl) return

    let url = linkUrl
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url
    }

    editor.chain().focus().setLink({ href: url }).run()
    setLinkUrl("")
    setShowLinkDialog(false)
  }, [editor, linkUrl])

  // Insert HTML (for Instagram, Facebook embeds)
  const insertHtml = useCallback(() => {
    if (!editor || !htmlContent) return

    // Προεπεξεργασία του HTML για TikTok embeds
    let processedHtml = htmlContent

    // Ειδική επεξεργασία για TikTok embeds
    if (htmlContent.includes("tiktok.com")) {
      // Βεβαιωνόμαστε ότι το blockquote έχει τις απαραίτητες κλάσεις
      if (!htmlContent.includes('class="tiktok-embed"')) {
        processedHtml = processedHtml.replace(
          /<blockquote([^>]*)cite="([^"]*tiktok\.com[^"]*)"([^>]*)>/g,
          '<blockquote$1cite="$2"$3 class="tiktok-embed">',
        )
      }

      // Προσθέτουμε data-video-id αν λείπει (βοηθά στην αναγνώριση)
      if (!htmlContent.includes("data-video-id")) {
        const videoIdMatch = htmlContent.match(/tiktok\.com\/[^/]+\/video\/(\d+)/)
        if (videoIdMatch && videoIdMatch[1]) {
          const videoId = videoIdMatch[1]
          processedHtml = processedHtml.replace(/<blockquote([^>]*)>/g, `<blockquote$1 data-video-id="${videoId}">`)
        }
      }
    }

    // Insert the HTML as a raw HTML node
    editor
      .chain()
      .focus()
      .insertContent({
        type: "rawHtml",
        attrs: {
          content: processedHtml,
        },
      })
      .run()

    setHtmlContent("")
    setShowHtmlDialog(false)

    // Process social media embeds
    setTimeout(() => {
      processSocialEmbeds()
      // Try again with delays to ensure DOM is ready
      setTimeout(processSocialEmbeds, 500)
      setTimeout(processSocialEmbeds, 1000)
      setTimeout(processSocialEmbeds, 3000) // Προσθέτουμε μεγαλύτερη καθυστερήσει
    }, 100)
  }, [editor, htmlContent, processSocialEmbeds])

  // Don't render editor on server side
  if (!isMounted) {
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading editor...</div>
          </div>
        <div className="min-h-[300px] p-4 bg-white dark:bg-gray-900">
          <div className="text-gray-400 dark:text-gray-500">{placeholder}</div>
        </div>
      </div>
    )
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
          className={editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Bold"
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
          className={editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Italic"
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
          className={editor.isActive("underline") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Underline"
          type="button"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
          className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Heading 1"
          type="button"
        >
          H1
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
          className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Heading 2"
          type="button"
        >
          H2
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
          className={editor.isActive("heading", { level: 3 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Heading 3"
          type="button"
        >
          H3
        </Button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign("left").run())}
          className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Align Left"
          type="button"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign("center").run())}
          className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Align Center"
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign("right").run())}
          className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Align Right"
          type="button"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
          className={editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Bullet List"
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
          className={editor.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Numbered List"
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().toggleBlockquote().run())}
          className={editor.isActive("blockquote") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Quote"
          type="button"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => setShowLinkDialog(true))}
          className={editor.isActive("link") ? "bg-gray-200 dark:bg-gray-700" : ""}
          title="Insert Link"
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => setShowImageDialog(true))}
          title="Insert Image"
          type="button"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => setShowYoutubeDialog(true))}
          title="Insert YouTube Video"
          type="button"
        >
          <YoutubeIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => setShowHtmlDialog(true))}
          title="Insert HTML (Instagram, Facebook embeds)"
          type="button"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().undo().run())}
          disabled={!editor.can().undo()}
          title="Undo"
          type="button"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleButtonClick(() => editor.chain().focus().redo().run())}
          disabled={!editor.can().redo()}
          title="Redo"
          type="button"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div>
        <EditorContent editor={editor} />
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
                <Input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={insertLink} disabled={!linkUrl} type="button" className="flex-1">
                Insert
              </Button>
              <Button variant="outline" onClick={() => setShowLinkDialog(false)} type="button" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Insert Image</h3>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <Input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">OR</p>
                <Button onClick={triggerFileInput} disabled={isUploading} type="button">
                  {isUploading ? "Uploading..." : "Upload from Computer"}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={insertImage} disabled={!imageUrl && !previewImage} type="button" className="flex-1">
                Insert
              </Button>
              <Button variant="outline" onClick={() => setShowImageDialog(false)} type="button" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Dialog */}
      {showYoutubeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Insert YouTube Video</h3>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">YouTube URL or Video ID</label>
                <Input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  autoFocus
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Paste the full YouTube URL or just the video ID
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={insertYoutube} disabled={!youtubeUrl} type="button" className="flex-1">
                Insert
              </Button>
              <Button variant="outline" onClick={() => setShowYoutubeDialog(false)} type="button" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Dialog */}
      {showHtmlDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[600px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Insert HTML</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HTML Code</label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="<blockquote class='instagram-media'>...</blockquote>"
                  className="w-full h-60 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
                  autoFocus
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Paste the embed code from Instagram, Facebook, TikTok, or other platforms. For Instagram, use the "Embed" option from the post's menu. For Facebook, use the embed code from the post's options.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={insertHtml} disabled={!htmlContent} type="button" className="flex-1">
                Insert
              </Button>
              <Button variant="outline" onClick={() => setShowHtmlDialog(false)} type="button" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble Menu removed for now */}
    </div>
  )
}

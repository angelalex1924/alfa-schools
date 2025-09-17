"use client"

import { useEffect, useState } from 'react'

export default function IframeTestPage() {
  const [isInIframe, setIsInIframe] = useState(false)

  useEffect(() => {
    // Check if the page is loaded in an iframe
    const checkIframe = () => {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    }

    setIsInIframe(checkIframe())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🚀 Alfa Schools - Iframe Test
        </h1>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isInIframe ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            <h2 className="font-semibold mb-2">
              {isInIframe ? '✅ Successfully Loaded in Iframe!' : 'ℹ️ Loaded in Main Window'}
            </h2>
            <p>
              {isInIframe 
                ? 'This page is successfully embedded in an iframe. The iframe restrictions have been removed!'
                : 'This page is loaded in the main browser window, not in an iframe.'
              }
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">🔧 Iframe Configuration:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ X-Frame-Options: ALLOWALL</li>
              <li>✅ Content-Security-Policy: frame-ancestors *</li>
              <li>✅ CORS Headers: Enabled</li>
              <li>✅ Middleware: Configured</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">📝 Test Instructions:</h3>
            <p className="text-sm">
              To test iframe embedding, use this code in your portfolio:
            </p>
            <code className="block bg-gray-800 text-green-400 p-2 rounded mt-2 text-xs overflow-x-auto">
              {`<iframe 
  src="https://alfaschools.gr" 
  width="100%" 
  height="600px"
  frameborder="0"
  title="Alfa Schools">
</iframe>`}
            </code>
          </div>

          <div className="text-center">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🏠 Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

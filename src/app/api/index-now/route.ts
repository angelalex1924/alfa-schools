import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    // Submit to Bing IndexNow API
    const indexNowUrl = 'https://api.indexnow.org/indexnow'
    const key = process.env.INDEXNOW_KEY || 'your-indexnow-key'
    
    const response = await fetch(indexNowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: new URL(url).hostname,
        key,
        keyLocation: `${new URL(url).origin}/indexnow-key.txt`,
        urlList: [url]
      })
    })

    if (response.ok) {
      console.log(`🚀 URL submitted to IndexNow: ${url}`)
      return NextResponse.json({ 
        success: true, 
        message: 'URL submitted for instant indexing',
        url 
      })
    } else {
      console.log(`⚠️ IndexNow submission failed for: ${url}`)
      return NextResponse.json({ 
        success: false, 
        message: 'IndexNow submission failed',
        url 
      })
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit to IndexNow' 
      },
      { status: 500 }
    )
  }
}

import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Revalidating sitemap...')
    
    // Revalidate the sitemap
    revalidatePath('/sitemap.xml')
    
    // Ping Google about sitemap update
    try {
      await fetch('https://www.google.com/ping?sitemap=https://www.alfaschools.gr/sitemap.xml', {
        method: 'GET'
      })
      console.log('✅ Google pinged about sitemap update')
    } catch (pingError) {
      console.log('⚠️ Google ping failed (sitemap still updated)')
    }
    
    console.log('✅ Sitemap revalidated successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error revalidating sitemap:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to revalidate sitemap',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

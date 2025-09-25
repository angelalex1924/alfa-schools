import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

// Initialize Firebase Admin SDK for server-side
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get('templateId')

    if (!templateId) {
      return NextResponse.json(
        { error: 'Missing templateId parameter' },
        { status: 400 }
      )
    }

    console.log('Loading template:', templateId)
    console.log('Firebase config:', {
      projectId: firebaseConfig.projectId,
      apiKey: firebaseConfig.apiKey ? 'present' : 'missing'
    })

    const templateRef = doc(db, 'email_templates', templateId)
    const templateSnap = await getDoc(templateRef)

    if (templateSnap.exists()) {
      console.log('Template found:', templateSnap.data())
      return NextResponse.json({
        customization: templateSnap.data(),
        status: 'success'
      })
    } else {
      console.log('Template not found, returning default')
      return NextResponse.json({
        customization: null,
        status: 'not_found'
      })
    }

  } catch (error) {
    console.error('Error loading template:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { 
        error: 'Failed to load template',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { templateId, customization } = await request.json()

    if (!templateId || !customization) {
      return NextResponse.json(
        { error: 'Missing required fields: templateId, customization' },
        { status: 400 }
      )
    }

    console.log('Saving template:', templateId)
    console.log('Customization data:', customization)

    // Save to Firebase
    const templateRef = doc(db, 'email_templates', templateId)
    await setDoc(templateRef, {
      ...customization,
      updatedAt: new Date(),
      version: Date.now()
    })

    console.log(`Template ${templateId} saved successfully to Firebase`)

    return NextResponse.json({
      message: 'Template saved successfully!',
      templateId,
      status: 'success'
    })

  } catch (error) {
    console.error('Error saving template:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { 
        error: 'Failed to save template',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

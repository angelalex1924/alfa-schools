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

export async function GET() {
  try {
    console.log('Testing Firebase connection...')
    console.log('Firebase config:', {
      projectId: firebaseConfig.projectId,
      apiKey: firebaseConfig.apiKey ? 'present' : 'missing',
      authDomain: firebaseConfig.authDomain
    })

    // Initialize Firebase
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    console.log('Firebase initialized successfully')

    // Test write operation
    const testRef = doc(db, 'test', 'connection')
    await setDoc(testRef, {
      message: 'Firebase connection test',
      timestamp: new Date(),
      status: 'success'
    })

    console.log('Test document written successfully')

    // Test read operation
    const testSnap = await getDoc(testRef)
    const testData = testSnap.data()

    console.log('Test document read successfully:', testData)

    return NextResponse.json({
      message: 'Firebase connection successful!',
      config: {
        projectId: firebaseConfig.projectId,
        apiKey: firebaseConfig.apiKey ? 'present' : 'missing'
      },
      testData
    })

  } catch (error) {
    console.error('Firebase connection test failed:', error)
    return NextResponse.json(
      { 
        error: 'Firebase connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

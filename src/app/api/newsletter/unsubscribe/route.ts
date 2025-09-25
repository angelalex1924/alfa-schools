import { NextRequest, NextResponse } from 'next/server'
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('Processing unsubscribe request for:', email)

    // Find the subscriber by email
    const subscribersRef = collection(db, 'newsletter_subscribers')
    const q = query(subscribersRef, where('email', '==', email.toLowerCase().trim()))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      )
    }

    // Delete all matching subscribers (in case there are duplicates)
    const deletePromises = querySnapshot.docs.map(docSnapshot => 
      deleteDoc(doc(db, 'newsletter_subscribers', docSnapshot.id))
    )

    await Promise.all(deletePromises)

    console.log(`Successfully unsubscribed ${email} from newsletter`)

    return NextResponse.json({
      message: 'Successfully unsubscribed from newsletter',
      email: email,
      status: 'success'
    })

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return NextResponse.json(
      { 
        error: 'Failed to unsubscribe from newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { getNavigation } from '@/lib/navigation'

export async function GET() {
  try {
    const navigation = await getNavigation()
    
    if (!navigation) {
      return NextResponse.json(
        { error: 'Navigation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(navigation)
  } catch (error) {
    console.error('Error in navigation API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
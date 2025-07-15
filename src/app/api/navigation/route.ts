import { NextResponse } from 'next/server'
import { getNavigation } from '@/lib/navigation'

export async function GET() {
  try {
    console.log('Navigation API route called');
    const navigation = await getNavigation()
    console.log('Navigation data:', navigation);
    
    if (!navigation) {
      console.log('Navigation not found, returning 404');
      return NextResponse.json(
        { error: 'Navigation not found' },
        { status: 404 }
      )
    }

    console.log('Returning navigation data');
    return NextResponse.json(navigation)
  } catch (error) {
    console.error('Error in navigation API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
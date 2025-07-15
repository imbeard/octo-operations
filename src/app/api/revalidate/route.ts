import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { _type, slug } = body

    if (_type === 'page') {
      revalidatePath(`/${slug}`)
    } else if (_type === 'homePage') {
      revalidatePath('/')
    }

    return Response.json({ revalidated: true, now: Date.now() })
  } catch {
    return Response.json({ message: 'Error revalidating' }, { status: 500 })
  }
} 
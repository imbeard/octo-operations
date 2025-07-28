import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { _type, slug } = body

    if (_type === 'page') {
      revalidatePath(`/${slug}`)
      revalidateTag(`project-${slug}`)
    } else if (_type === 'homePage') {
      revalidatePath('/')
      revalidateTag('projects')
      revalidateTag('settings')
    } else if (_type === 'project') {
      revalidatePath('/projects')
      revalidateTag('projects')
      if (slug) {
        revalidateTag(`project-${slug}`)
      }
    } else if (_type === 'settings') {
      revalidatePath('/')
      revalidateTag('settings')
    }

    return Response.json({ 
      revalidated: true, 
      now: Date.now(),
      type: _type,
      slug: slug || 'homepage'
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ message: 'Error revalidating' }, { status: 500 })
  }
} 
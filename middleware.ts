import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login and signup pages
     */
    '/((?!_next/static|_next/image|favicon.ico|login|signup|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

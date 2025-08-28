import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['en', 'fr']

function getLocale(req: NextRequest): string {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value
  if (cookie && locales.includes(cookie)) return cookie

  const header = req.headers.get('accept-language') || ''
  const preferred = header.split(',')[0]?.toLowerCase() || 'en'
  return preferred.startsWith('fr') ? 'fr' : 'en'
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip next internals and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const hasLocale = locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))

  // If path has a locale prefix, rewrite to the non-prefixed path so
  // existing App Router routes work without duplication, while keeping the URL.
  if (hasLocale) {
    const url = req.nextUrl.clone()
    const without = pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/"
    url.pathname = without
    return NextResponse.rewrite(url)
  }

  if (!hasLocale) {
    const locale = getLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths and only run on app routes
    '/((?!_next|.*\\..*|api).*)',
  ],
}

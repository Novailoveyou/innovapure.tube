import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'
import { UnionToTuple } from '@/types'
import { Locale } from '@prisma/client'

const I18nMiddleware = createI18nMiddleware({
  locales: ['ru', 'en', 'kk', 'be'] as const satisfies UnionToTuple<Locale>,
  defaultLocale: 'ru',
  urlMappingStrategy: 'rewriteDefault'
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}

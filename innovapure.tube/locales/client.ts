'use client'
import { createI18nClient } from 'next-international/client'
import { Locale } from '@/types'

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  ru: () => import('@/locales/static/ru'),
  en: () => import('@/locales/static/en'),
  kk: () => import('@/locales/static/kk'),
  be: () => import('@/locales/static/be'),
} satisfies { [key in Locale]: () => void })

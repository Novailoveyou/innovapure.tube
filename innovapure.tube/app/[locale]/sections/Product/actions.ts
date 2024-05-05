import 'server-only'
import { prisma } from '@/prisma'
import { cache } from 'react'
import { Locale, PageName } from '@prisma/client'
import { CompleteCategory } from '@/prisma/zod'

/**
 * @description Server Action - asynchronous function that is executed on the server. It can be used in Server and Client Components to handle form submissions and data mutations
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
export const getCatalog = cache(
  async ({ locale, page }: { locale: Locale; page: PageName }) => {
    return await prisma.sectionProduct.findFirst({
      select: {
        title: true,
        categories: {
          select: {
            name: true,
            slug: true,
            description: true,
            image: {
              select: {
                src: true,
                alt: true
              }
            },
            button: {
              select: {
                text: true
              }
            }
          }
        }
      },
      where: {
        locale,
        isPublished: true,
        pages: {
          some: {
            name: page
          }
        }
      }
    })
  }
)

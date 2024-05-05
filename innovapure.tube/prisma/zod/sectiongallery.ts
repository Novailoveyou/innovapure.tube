import * as z from "zod"
import { Locale } from "@prisma/client"
import { CompleteSlide, RelatedSlideModel, CompletePage, RelatedPageModel } from "./index"

export const SectionGalleryModel = z.object({
  /**
   * The unique identifier for the record
   * @default {Generated by database}
   */
  id: z.string(),
  /**
   * locale of the record
   * @default {ru}
   */
  locale: z.nativeEnum(Locale),
  /**
   * whether record is published
   * @default {false}
   */
  isPublished: z.boolean(),
  /**
   * date of record creation
   * @default {now()}
   */
  createdAt: z.date(),
  /**
   * date of record update
   * @default {now()}
   */
  updatedAt: z.date(),
})

export interface CompleteSectionGallery extends z.infer<typeof SectionGalleryModel> {
  slides: CompleteSlide[]
  pages: CompletePage[]
}

/**
 * RelatedSectionGalleryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSectionGalleryModel: z.ZodSchema<CompleteSectionGallery> = z.lazy(() => SectionGalleryModel.extend({
  /**
   * gallery slides 
   */
  slides: RelatedSlideModel.array(),
  /**
   * pages with this section
   */
  pages: RelatedPageModel.array(),
}))

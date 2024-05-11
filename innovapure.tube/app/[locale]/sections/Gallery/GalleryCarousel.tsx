'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel'
import { useState, useEffect } from 'react'
import { Gallery } from './Gallery'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icons'
import { cn } from '@/utils'
import { ResponsiveImage } from '@/components/shared/images'

const ArrowLeft = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='lucide lucide-arrow-left h-4 w-4'>
    <path d='m12 19-7-7 7-7'></path>
    <path d='M19 12H5'></path>
  </svg>
)
const ArrowRight = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='lucide lucide-arrow-right h-4 w-4'>
    <path d='M5 12h14'></path>
    <path d='m12 5 7 7-7 7'></path>
  </svg>
)

const GalleryCarousel = ({ slides }: Pick<Gallery, 'slides'>) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {slides.map(
          (
            { id, strap, title, subtitle, image, buttons, isDecoration },
            idx
          ) => (
            <CarouselItem key={id}>
              <div className='flex flex-col sm:flex-row justify-between'>
                <div className='flex flex-col justify-around basis-1/2'>
                  <p>{strap}</p>
                  {idx === 0 ? (
                    <h1 className=''>{title}</h1>
                  ) : (
                    <h2 className=''>{title}</h2>
                  )}
                  <p>{subtitle}</p>
                </div>

                <div className='basis-1/2'>
                  <ResponsiveImage {...image} priority />
                </div>
                <div className='flex my-8'>
                  {buttons.map((button, buttonIdx) => (
                    <Button
                      key={`GalleryCarousel__button--${buttonIdx + 1}`}
                      variant={buttonIdx == 1 ? 'outline' : 'secondary'}
                      className={cn(
                        buttonIdx == 1 && 'hidden sm:block',
                        buttonIdx == 0 && 'w-full my-8 sm:my-0 sm:w-auto'
                      )}>
                      {button.text}
                    </Button>
                  ))}
                </div>
              </CarouselItem>
            )
          }
        )}
      </CarouselContent>
      <div className='flex items-center gap-4 justify-center sm:justify-start'>
        <div className='hidden sm:flex'>
          <Button variant='outline' onClick={() => api?.scrollPrev()}>
            <Icon>
              <ArrowLeft />
            </Icon>
          </Button>
          <Button variant='outline' onClick={() => api?.scrollNext()}>
            <Icon>
              <ArrowRight />
            </Icon>
          </Button>
        </div>
        <div className='flex gap-4 sm:ml-44 sm:p-8'>
          {slides.map(({ id }, idx) => (
            <Button key={id} variant='ghost' onClick={() => api?.scrollTo(idx)}>
              <span
                className={cn(
                  'w-8 h-0.5 mx-auto mt-0 my-4 border-0 rounded md:my-10 bg-inactive',
                  current === idx && 'bg-secondary'
                )}
              />
            </Button>
          ))}
        </div>
      </div>
    </Carousel>
  )
}

export default GalleryCarousel

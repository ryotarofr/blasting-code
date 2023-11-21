"use client"

import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { selectorConfig } from '@/config/selecter'
import { Button } from './ui/button'

function CarouselDemo() {
  // todo 
  // 各セレクターアイテムをuseStateで管理

  const [selectFramework, setSelectFramework] = useState("")
  const [selectAuth, setSelectAuth] = useState("")
  const [selectORM, setSelectORM] = useState("")

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const updateCurrent = () => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }

  const handlePrevious = () => {
    emblaApi?.scrollPrev()

    updateCurrent()
  }

  const handleNext = () => {
    emblaApi?.scrollNext()

    updateCurrent()
  }

  const handleThumbClick = (index: number) => {
    if (!emblaApi || !emblaThumbsApi) return
    emblaApi.scrollTo(index)

    updateCurrent()
  }

  // 未実装の機能は選択できないようにする(Frameworkを基準にしている)
  const handleSelectFramework = (item: string) => {
    setSelectAuth("")
    setSelectORM("")
    if (selectFramework === "Astro") {
      setSelectAuth("")
      setSelectORM("")
      setSelectFramework(item)
    } else {
      setSelectFramework(item)
    }
  }



  return (
    <div className="p-6">
      <div>{selectedIndex}</div>

      <section>
        <div className="item-center mt-10 flex">
          <button
            onClick={handlePrevious}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md  dark:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="my-auto h-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {selectorConfig.map((slide, index) => (
                <div key={index} className="mx-4 w-full flex-[0_0_100%]">
                  <div className='items-center text-center'>{slide.title}</div>
                  {/* <div className='text-center items-center'>{slide.framework}</div> */}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 rotate-180"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

        </div>
        {/* 下のドット */}
        <div className="flex justify-center  gap-3">
          {selectorConfig.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
            // className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-gray-500' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>

        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex  gap-3">
            {selectorConfig.map((thumb, index) => (
              <button key={index} onClick={() => handleThumbClick(index)} className="flex-[0_0_28%]">
                <div
                  // className="aspect-video w-full flex items-center justify-center text-xl font-bold"
                  style={{
                    opacity: index === selectedIndex ? 1 : 0.6,
                  }}
                >
                  {/* <img src={thumb.url} alt="thumbnail" className="object-cover rounded-lg" /> */}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='text-xl font-semibold'>Framework</div>
        <div className='flex'>
          {/* todo 
            バリデーション：表示させてる各項目選択必須　
        */}

          {selectorConfig[selectedIndex].framework.map((item, index) => (
            <div key={index}>
              <Button
                variant="ghost"
                className={`${selectFramework === item ? "bg-black/10 dark:bg-blue-800" : "text-gray-400"}`}
                onClick={() => handleSelectFramework(item)}>
                {item}
              </Button>
            </div>
          ))}
        </div>

        <div className='text-xl font-semibold'>Authentication</div>
        <div className='flex'>
          {selectFramework === "Astro" ? (
            <div className='flex'>
              {selectorConfig[selectedIndex].auth?.map((item, index) => (
                <div key={index}>
                  <Button
                    variant="ghost"
                    className="cursor-not-allowed text-gray-400 opacity-80"
                  >
                    {item}
                  </Button>
                </div>
              ))}
            </div>
          ) :
            <div className='flex'>
              {selectorConfig[selectedIndex].auth?.map((item, index) => (
                <div key={index}>
                  <Button
                    variant="ghost"
                    className={`${selectAuth === item ? "bg-black/10 dark:bg-blue-800" : "text-gray-400"}`}
                    onClick={() => setSelectAuth(item)}>
                    {item}
                  </Button>
                </div>
              ))}
            </div>
          }
        </div>
      </section>

      <section>
        <div className='text-xl font-semibold'>ORM</div>
        <div className='flex'>
          {selectFramework === "Astro" ? (
            <div>
              {selectorConfig[selectedIndex].orm === undefined ?
                (<Button
                  variant="ghost"
                  className="cursor-not-allowed text-gray-400 opacity-80"
                >
                  No items available
                </Button>) :
                <div>
                  {selectorConfig[selectedIndex].orm?.map((item, index) => (
                    <div key={index}>
                      <Button
                        variant="ghost"
                        className="cursor-not-allowed text-gray-400 opacity-80"
                      >
                        {item}
                      </Button>
                    </div>
                  ))}
                </div>
              }
            </div>
          ) :
            <div>
              {selectorConfig[selectedIndex].orm === undefined ?
                (<Button
                  variant="ghost"
                  className="cursor-not-allowed text-gray-400 opacity-80"
                >
                  No items available
                </Button>) :
                <div>
                  {selectorConfig[selectedIndex].orm?.map((item, index) => (
                    <div key={index}>
                      <Button
                        variant="ghost"
                        className={`${selectORM === item ? "bg-black/10 dark:bg-blue-800" : "text-gray-400"}`}
                        onClick={() => setSelectORM(item)}>
                        {item}
                      </Button>
                    </div>
                  ))}
                </div>
              }
            </div>
          }
        </div>
      </section>
    </div>
  )
}

export default CarouselDemo

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: "mdx blog",
  },
  {
    url: 'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: "mdx blog2",
  },
  {
    url: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: "mdx blog3",
  },
  {
    url: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: "mdx blog4",
  },
  {
    url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: "mdx blog5",
  },
]

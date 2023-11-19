import CarouselDemo from '@/components/carousel'
import ToggleThemeButton from '@/components/ui/toggle-theme'

export default function Home() {
  return (
    <div className='w-full flex justify-center'>
      <ToggleThemeButton />
      <CarouselDemo />
    </div>
  )
}

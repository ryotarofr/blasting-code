import CarouselDemo from '@/components/carousel'
import ToggleThemeButton from '@/components/ui/toggle-theme'

export default function Home() {
  return (
    <div className=''>
      <ToggleThemeButton />
      <div className='md:flex'>
        <CarouselDemo />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Landing page',
}

import Hero from '@/components/hero'
import Domains from '@/components/domains'

export default function Home() {
  return (
    <>
      <Hero />
      <Domains />
    </>
  )
}

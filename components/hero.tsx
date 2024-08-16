import logo from '@/public/images/logo.svg'
import Link from 'next/link'
import Image from 'next/image'
import FlickeringGrid from "@/components/magicui/flickering-grid";
import { cn } from "@/lib/utils";
import "../app/css/additional-styles/landing.css";


export default function Hero() {
  return (
    <section className="relative h-screen flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-32 pb-5 md:pt-40 md:pb-5">
          <div className="pb-5 md:pb-5">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <Image src={logo} alt='Logo' height={100} className="mx-auto mb-8" />
                  <p className="text-xl text-gray-100 mb-8" data-aos="zoom-y-out" data-aos-delay="350">
                    We are a student run tech community at Dayananda Sagar College of Engineering, Bangalore. We aim to provide a platform for students to learn, grow and innovate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlickeringGrid
        className="z-1 absolute inset-0 size-full"
        squareSize={8}
        gridGap={10}
        color="green"
        maxOpacity={0.25}
        flickerChance={0.5}
      />
    </section>
  )
}
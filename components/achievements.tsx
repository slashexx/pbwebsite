"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { AnimatedListDemo } from "./ui/AnimatedList";
import Image from 'next/image'

function Achievements() {

  return (
    <>
      <div className="container place-items-center font-bold pt-20 pb-5">
        <h2 className="text-3xl sm:text-4xl text-white-800 text-center font-black">
          Achievements
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
      
      <div className="w-[80vw] m-auto pt-11 flex items-center justify-center">
          <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[ Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>     
        <h2 className="text-l sm:text-xl text-white-800 text-center font-black">
          Google Summer of Code
        </h2>
          <div className="flex lg:flex-row ">
          <div className="w-1/2 hidden lg:flex items-center justify-center">
          <Image
          src={"/images/gsoclogo.png"}
          alt="gsoc"
          height={300}
          width={300}
        />
          </div>
          <div>
          <AnimatedListDemo type='gsoc'/>   
          </div>
          </div>  
        </SwiperSlide>
        <SwiperSlide>
        <h2 className="text-l sm:text-xl text-white-800 text-center font-black">
          The Linux Foundation
        </h2>

        <div className="flex lg:flex-row ">
        <div className="w-1/2 hidden lg:flex items-center justify-center">
          <Image
          src={"/images/lfxlogo.png"}
          alt="lfx"
          height={400}
          width={300}
          />
          </div>
          <AnimatedListDemo type='lfx'/>   
          </div> 
        </SwiperSlide>
        <SwiperSlide>
        <h2 className="text-l sm:text-xl text-white-800 text-center font-black">
          International Collegiate Programming Contest
        </h2>
        <div className="flex lg:flex-row ">
        <div className="w-1/2 hidden lg:flex items-center justify-center">
          <Image
          src={"/images/icpc.png"}
          alt="icpc"
          height={400}
          width={300}
        />
          </div>
          <AnimatedListDemo type='icpc'/>   
          </div> 
        </SwiperSlide>
        <SwiperSlide>
        <h2 className="text-l sm:text-xl text-white-800 text-center font-black">
          National Level Hackathons
        </h2>
        <div className="flex lg:flex-row ">
        <div className="w-1/2 hidden lg:flex items-center justify-center">
          <Image
          src={"/images/sihlogo.png"}
          alt="recruitment-poster"
          height={400}
          width={300}
        />
          </div>
          <AnimatedListDemo type='sih'/>   
          </div> 
        </SwiperSlide>
      </Swiper>
        </div>
      </div>
    </>
  );
}
export default Achievements;


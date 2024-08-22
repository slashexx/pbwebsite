"use client";

import Carousel from "./carousel.component";
import imageOne from "../public/images/pbach1.jpg";
import imageTwo from "../public/images/pbach2.jpg";
import imageThree from "../public/images/pbach3.jpg";

function Achievements() {
  let slides = [imageOne, imageTwo, imageThree];

  return (
    <>
      <div className="container place-items-center font-bold pt-20 pb-5">
        <h2 className="text-5xl text-white-800 text-center">Achievements</h2>
      </div>
      <div className="sm:w-[50%] md:w-[40%]  m-auto pt-11">
        <Carousel slides={slides} />
      </div>
    </>
  );
}

export default Achievements;

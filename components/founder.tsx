import imageOne from "../public/images/pbach1.jpg";
import Image from "next/image";
import "../app/css/additional-styles/landing.css";
export default function founder()
{
    return (
      <>
      <div className="container place-items-center font-bold pt-20 pb-10">
        <h2 className="text-5xl text-white-800 text-center">Founders</h2>
        <h5 className="text-2xl text-white-800 text-center">
          The people who made it possible.
        </h5>
      </div>
 
        <div className="flex justify-center items-center pb-5">
          <div className="p-10 w-full sm:w-2/3 md:w-1/2 lg:w-5/6">
            {data.map((data) => (
              <div className=" h-auto w-auto lg:flex p-5 transition-transform duration-1000 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                <div
                  className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden shadow-lg"
                  style={{ backgroundImage: `url(${data.url})` }}
                  title=""
                ></div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-grey rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <div className="font-bold text-2xl  text-green-600 mb-2 p-2">
                      {data.name}
                    </div>
                    <p className="text-green-600 text-base">
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}


const data = [
    {
        url: '/images/founder1.png',
        name:"Mohit Agarwal",
        description:"Mohit is currently an SDE2 at Glance (InMobi). Before this, he had stints at Ola and Amazon. Known for his straight, no nonsense attitude, Mohit laid the foundation for Competitive Programming culture in Point Blank. In his time as a student, Mohit won several contests such as the Nokia Collegiate Code Rally and qualified to the Regionals of the ACM-ICPC."
    },
    {
        url: '/images/founder2.png',
        name:"Soumya Pattanayak",
        description:"Widely regarded as one of DSCE’s strongest competitive programmers, Soumya was previously an SDE at Amazon and had a stint in Verse Innovation before moving on to do his own thing. Soumya’s skills in solving problems are only exceeded by his ability to grok new languages and build interesting projects. He’s also an ACM-ICPC regionalist."
    },
    {
        url: '/images/founder3.jpg',
        name:"Ashutosh Pandey",
        description:"Ashutosh is currently a Compiler Engineer at AMD. As a student he did Google Summer of Code with Arduino, was a Linux Foundation mentee with ELISA, and won several Hackathons including the Smart India Hackathon in 2019. He built up the Open Source and Hackathon culture in Point Blank, with numerous students going on to do prestigious programmes."
    }
]
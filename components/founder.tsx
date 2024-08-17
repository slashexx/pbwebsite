import Image from 'next/image';
import React from 'react';
export default function Teams() {

  const teamData = [
    {
      url: '/images/founder1.png',
      name: "Mohit Agarwal",
      description: "Mohit, SDE2 at Glance, is the driving force behind Point Blank's Competitive Programming culture. He has won several contests, including the Nokia Collegiate Code Rally, and qualified for ACM-ICPC Regionals."
    },
    {
      url: '/images/founder2.png',
      name: "Soumya Pattanayak",
      description: "A top coder at DSCE, Soumya has worked at Amazon and Verse Innovation. He's an ACM-ICPC regionalist known for his problem-solving skills and innovative projects."
    },
    {
      url: '/images/founder3.jpg',
      name: "Ashutosh Pandey",
      description: "Ashutosh, Compiler Engineer at AMD, excelled in Open Source and Hackathons. As a student, he did GSoC with Arduino, won the Smart India Hackathon, and mentored students for prestigious programs."
    }
  ];  

  return (
    <section className="relative" data-aos="zoom-y-out" data-aos-delay="150">
      <div className="py-20">
        <div className="container mx-auto px-6 md:px-12 xl:px-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-center text-3xl text-white font-extrabold md:text-4xl">
              Our Founding Members
            </h2>
            <p className="text-gray-300 text-xl lg:w-8/12 lg:mx-auto">
              Point Blank started as a project by three friends who wanted to induce a change by providing a platform for like minded smart students to come together and learn from each other.
            </p>
          </div>
          <div className="grid gap-12 items-center md:grid-cols-3">
            {teamData.map((member, index) => (
              <div key={index} className="space-y-4 text-center">
                <Image
                  className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                  src={member.url}
                  alt={member.name}
                  width="640"
                  height="805"
                />
                <div>
                  <h4 className="text-2xl font-bold text-green-500">{member.name}</h4>
                </div>
                <p className="text-gray-300 text-xl md:text-justify">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
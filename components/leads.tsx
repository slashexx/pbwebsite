// import "../app/css/additional-styles/landing.css";

// const leads = [
//   {
//     id: 0,
//     text: "Akash Singh",
//     subtext: "CloudSek, Gsoc 24 ",
//     url: "/images/lead1.jpg",
//   },
//   {
//     id: 1,
//     text: "Saalim Quadri",
//     subtext: "Raptee, LFX 23",
//     url: "/images/Lead2.jpg",
//   },
//   {
//     id: 2,
//     text: "Pratyush Singh",
//     subtext: "Ultrahuman, Gsoc 23,24",
//     url: "/images/lead3.jpg",
//   },
// ];

// const Leads = () => {
//   return (
//     <>
//       <div className="container place-items-center font-bold pt-20 pb-10">
//         <h2 className="text-5xl text-white-800 text-center">Leads</h2>
//         <h5 className="text-2xl text-white-800 text-center">
//           Our Leadership Position are held by the best minds in and across the
//           campus
//         </h5>
//       </div>
//       <div className="view">
//         {leads.map((lead) => (
//           <div
//             key={lead.id}
//             className="box card-wrapper transition-transform duration-1000 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//             style={{ backgroundImage: `url(${lead.url})` }}
//             title=""
//           >
//             <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 text-center text-white">
//               <h1 className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-xl font-bold ">
//                 {lead.text}
//               </h1>
//               <h3 className="text-lg mt-2">{lead.subtext}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Leads;


import React from 'react';

interface Lead {
  id: string;
  name: string;
  position: string;
  organization: string;
  additionalInfo: string;
  imageUrl: string;
}

const Leads: React.FC = () => {
  const currentLeads: Lead[] = [
    {
      id: '10',
      name: 'Akash Singh',
      position: '3rd year',
      organization: 'CloudSek',
      additionalInfo: 'Gsoc 24',
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQFeShMi1sbKLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718481763562?e=1729123200&v=beta&t=60HO7YQ53F44tUfCHikuDNYHZPojS2SJD0msO1Sm3eY",
    },
    {
        id: '1',
        name: 'Saalim Quadri',
        position: '4th year',
        organization: 'Raptee',
        additionalInfo: 'LFX 23',
        imageUrl: 'https://ik.imagekit.io/qx5kklh3ls/WhatsApp%20Image%202023-10-29%20at%2011.12.20%20AM.jpeg?updatedAt=1698558279266',
      },
    {
      id: '3',
      name: 'Pratyush Singh',
      position: 'Alumni',
      organization: 'Ultrahuman',
      additionalInfo: 'Gsoc 23, 24',
      imageUrl: 'https://github-production-user-asset-6210df.s3.amazonaws.com/90026952/279694915-c7693363-6623-4bd2-9503-ee092b0e3593.jpeg',
    },
  ];

  const alumniLeads: Lead[] = [
    {
      id: '2',
      name: 'Prathik Singh',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://ik.imagekit.io/qx5kklh3ls/index.jpeg?updatedAt=1678781533632',
    },
    {
      id: '4',
      name: 'Ashutosh Pandey',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/36353507?v=4',
    },
    {
      id: '5',
      name: 'Bapu Pruthvidhar',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/37359679?v=4',
    },
    {
      id: '6',
      name: 'Anukul Anand',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/64669326?v=4',
    },
    {
      id: '7',
      name: 'Madhur Mehta',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/77354138?v=4',
    },
    {
      id: '8',
      name: 'Debayan Ghosh Dastider',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/77199373?v=4',
    },
    {
      id: '9',
      name: 'Rithik Raj Pandey',
      position: '',
      organization: '',
      additionalInfo: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/83706503?s=400&u=2d00114433bc28b8e28252e41bbc919229b9a7f4&v=4',
    },
  ];

  return (
    <section style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#1a1a1a', color: '#fff' }}>
      <LeadSection title="Current Leads" leads={currentLeads} />
      <LeadSection title="Alumni Leads" leads={alumniLeads} />
    </section>
  );
};

interface LeadSectionProps {
  title: string;
  leads: Lead[];
}

const LeadSection: React.FC<LeadSectionProps> = ({ title, leads }) => (
  <div style={{ padding: '1rem', marginTop: title === "Alumni Leads" ? '2rem' : '2rem' }}>
    <h3 style={{
      textAlign: 'center',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: 'bold',
      borderBottom: '2px solid #00ff33',
      paddingBottom: '0.5rem',
      marginBottom: '1rem'
    }}>
      {title}
    </h3>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {leads.map((lead) => (
        <div key={lead.id} style={{
          backgroundImage: `url(${lead.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          height: '325px',
          width: '250px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
            color: '#fff',
            textAlign: 'center',
          }}>
            <h3 style={{ margin: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>{lead.name}</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>{lead.position}</p>
            <p style={{ margin: '0', fontSize: '1rem' }}>{lead.organization}</p>
            <p style={{ margin: '0', fontSize: '1rem' }}>{lead.additionalInfo}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Leads;


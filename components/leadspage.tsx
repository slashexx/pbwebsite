"use client";

import React, { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  position: string;
  organization: string;
  additionalInfo: string;
  imageUrl: string;
}

const Leads: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#000000', color: '#fff' }}>
      <button 
        onClick={toggleForm} 
        style={{
          position: 'fixed',
          top: '85px',
          right: '85px',
          padding: '10px 20px',
          backgroundColor: '#00ff33',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000, // Ensures the button stays on top
        }}
      >
        Add Lead
      </button>
      
      {showForm && <LeadForm closeForm={toggleForm} />}

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
  <div style={{ padding: '1rem', marginTop: '2rem' }}>
    <h3 style={{
      textAlign: 'center',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: 'bold',
      borderBottom: '2px solid #000000',
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

interface LeadFormProps {
  closeForm: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ closeForm }) => {
  const [formData, setFormData] = useState<Lead>({
    id: '',
    name: '',
    position: '',
    organization: '',
    additionalInfo: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    closeForm();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      zIndex: 1001,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    }}>
      <h2>Add a New Lead</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          style={{ display: 'block', margin: '1rem 0' }}
        />
        <input 
          type="text" 
          name="position" 
          placeholder="Position" 
          value={formData.position} 
          onChange={handleChange} 
          required 
          style={{ display: 'block', margin: '1rem 0' }}
        />
        <input 
          type="text" 
          name="organization" 
          placeholder="Organization" 
          value={formData.organization} 
          onChange={handleChange} 
          required 
          style={{ display: 'block', margin: '1rem 0' }}
        />
        <input 
          type="text" 
          name="additionalInfo" 
          placeholder="Additional Info" 
          value={formData.additionalInfo} 
          onChange={handleChange} 
          style={{ display: 'block', margin: '1rem 0' }}
        />
        <input 
          type="text" 
          name="imageUrl" 
          placeholder="Image URL" 
          value={formData.imageUrl} 
          onChange={handleChange} 
          required 
          style={{ display: 'block', margin: '1rem 0' }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#00ff33',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}>Submit</button>
        <button onClick={closeForm} style={{
          marginLeft: '10px',
          padding: '10px 20px',
          backgroundColor: '#ff0033',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}>Cancel</button>
      </form>
    </div>
  );
};

export default Leads;

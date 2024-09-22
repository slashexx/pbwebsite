"use client";

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from "@/Firebase";
import { db } from "@/Firebase";

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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentLeads, setCurrentLeads] = useState<Lead[]>([]);
  const [alumniLeads, setAlumniLeads] = useState<Lead[]>([]);

  useEffect(() => {
    // const auth = getAuth();
    // const db = getFirestore();

    const checkAdmin = async (uid: string) => {
      try {
        console.log(uid);
        const docRef = doc(db, "admin", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("helo")
          setIsAdminLoggedIn(true);
          console.log("checked")
          // isAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
          console.log(docRef)
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdminLoggedIn(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdmin(user.uid);
      } else {
        setIsAdminLoggedIn(false);
      }
    });

    // Fetch leads from Firestore
    const fetchLeads = async () => {
      const leadsRef = collection(db, "leads");
      const querySnapshot = await getDocs(leadsRef);
      const currentLeads: Lead[] = [];
      const alumniLeads: Lead[] = [];

      querySnapshot.forEach((doc) => {
        const leadData = doc.data() as Lead;
        if (leadData.position === "Current") {
          currentLeads.push({ ...leadData, id: doc.id });
        } else {
          alumniLeads.push({ ...leadData, id: doc.id });
        }
      });

      setCurrentLeads(currentLeads);
      setAlumniLeads(alumniLeads);
    };

    fetchLeads();

    return () => unsubscribe();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#000000', color: '#fff' }}>
      {isAdminLoggedIn && (
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
            zIndex: 1000,
          }}
        >
          Add Lead
        </button>
      )}

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
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    name: '',
    position: 'Current',
    organization: '',
    additionalInfo: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewLead({
      ...newLead,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !image) {
      alert("Please provide the lead name and image.");
      return;
    }

    const db = getFirestore();
    const storage = getStorage();

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${newLead.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add lead to Firestore
      await addDoc(collection(db, 'leads'), {
        ...newLead,
        imageUrl: imageUrl,
      });

      console.log("New Lead Submitted:", { ...newLead, imageUrl });
      closeForm();
    } catch (error) {
      console.error("Error adding new lead:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '1rem',
        margin: '2rem auto',
        width: '300px',
        borderRadius: '10px',
        border: '1px solid #555',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Add New Lead</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newLead.name || ''}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', color: '#000' }} // Make text color black for visibility
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Position:</label>
        <select
          name="position"
          value={newLead.position}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', color: '#000' }} // Dropdown menu
        >
          <option value="Current">Current</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Organization:</label>
        <input
          type="text"
          name="organization"
          value={newLead.organization || ''}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', color: '#000' }} // Make text color black for visibility
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Additional Info:</label>
        <input
          type="text"
          name="additionalInfo"
          value={newLead.additionalInfo || ''}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', color: '#000' }} // Make text color black for visibility
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', color: '#000' }} // File input
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: '#00ff33',
          color: '#000',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Leads;
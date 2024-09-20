"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/Firebase';  // Ensure you import Firebase auth
import { collection, addDoc, getDocs, orderBy, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import './EventCard.css';

interface Event {
  eventName: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  id?: string; // Optional ID field for Firestore document ID
}

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState('');
  const [eventDataToEdit, setEventDataToEdit] = useState<Event | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State for admin status

  // Check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const querySnapshot = await getDocs(collection(db, 'admin'));
          querySnapshot.forEach((doc) => {
            if (doc.data().uid === uid) {
              setIsAdmin(true); // Set admin status
            }
          });
        }
      });
    };

    checkAdminStatus();
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, 'events'), orderBy('startDate'));
      const querySnapshot = await getDocs(q);
      const eventsList: Event[] = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data() as Event;
        eventData.id = doc.id; // Capture the document ID
        eventsList.push(eventData);
      });
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  // Add a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event = {
      eventName,
      description,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : '',
      startDate,
      endDate,
    };

    try {
      await addDoc(collection(db, 'events'), newEvent);
      setEvents((prevEvents) => [...prevEvents, newEvent].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
      setEventName('');
      setDescription('');
      setImageUrl('');
      setImageFile(null);
      setStartDate('');
      setEndDate('');
      setFormVisible(false);
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  };

  // Edit an event
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    const updatedEvent = {
      eventName,
      description,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : eventDataToEdit.imageUrl,
      startDate,
      endDate,
    };

    try {
      const eventRef = doc(db, 'events', eventDataToEdit.id);
      await updateDoc(eventRef, updatedEvent);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventDataToEdit.id
            ? { ...eventDataToEdit, ...updatedEvent }
            : event
        ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      );

      setEditFormVisible(false);
      setEventToEdit('');
      setImageFile(null); // Clear image file on edit
    } catch (error) {
      console.error('Error updating event: ', error);
    }
  };

  // Remove an event
  const handleRemoveEvent = async () => {
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    try {
      await deleteDoc(doc(db, 'events', eventDataToEdit.id));
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventDataToEdit.id));
      setEditFormVisible(false);
      setEventToEdit('');
    } catch (error) {
      console.error('Error deleting event: ', error);
    }
  };

  // Set the event to edit
  const handleEventToEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventName = e.target.value;
    setEventToEdit(eventName);

    const selectedEvent = events.find((event) => event.eventName === eventName);
    if (selectedEvent) {
      setEventDataToEdit(selectedEvent);
      setDescription(selectedEvent.description);
      setImageUrl(selectedEvent.imageUrl);
      setStartDate(selectedEvent.startDate);
      setEndDate(selectedEvent.endDate);
    } else {
      setEventDataToEdit(null);
    }
  };

  // Filter events based on date
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDate) > currentDate);
  const ongoingEvents = events.filter(event => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.endDate) < currentDate);

  // Render event cards
  const renderEventCards = (events: Event[]) => {
    if (!events || events.length === 0) {
      return <p>No events to display</p>;
    }

    return (
      <div className="event-cards-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-card-inner">
              <div className="event-card-front">
                <div className="event-container">
                  <div className="event-poster-container">
                    <img
                      src={event.imageUrl || 'https://via.placeholder.com/150'}
                      alt={event.eventName || 'Event image'}
                      className="event-poster"
                    />
                  </div>
                  <div className="event-content-container">
                    <h3>{event.eventName || 'Unnamed Event'}</h3>
                    <p>{event.startDate} {event.endDate && ` - ${event.endDate}`}</p>

                  </div>
                </div>
              </div>
              <div className="event-card-back">
                <img
                  src={event.imageUrl || 'https://via.placeholder.com/150'}
                  alt={event.eventName || 'Event image'}
                />
                <p>{event.description || 'No description available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {isAdmin && (
        <>
          <button onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Hide Form' : 'Show Form'}
          </button>

          {formVisible && (
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
              <div>
                <label>Event Name:</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Image Upload:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageFile(e.target.files[0]);
                      setImageUrl(URL.createObjectURL(e.target.files[0])); // Preview the image
                    }
                  }}
                  required
                />
              </div>
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Add Event</button>
            </form>
          )}
        </>
      )}

      <div>
        <h2>Upcoming Events</h2>
        {renderEventCards(upcomingEvents)}
      </div>
      <div>
        <h2>Ongoing Events</h2>
        {renderEventCards(ongoingEvents)}
      </div>
      <div>
        <h2>Past Events</h2>
        {renderEventCards(pastEvents)}
      </div>

      {isAdmin && (
        <>
          <button onClick={() => setEditFormVisible(!editFormVisible)}>
            {editFormVisible ? 'Hide Edit Form' : 'Edit/Remove Event'}
          </button>

          {editFormVisible && (
            <form onSubmit={handleEditSubmit} style={{ marginBottom: '20px' }}>
              <div>
                <label>Enter Event Name to Edit or Remove:</label>
                <input
                  type="text"
                  value={eventToEdit}
                  onChange={handleEventToEditChange}
                  required
                />
              </div>
              {eventDataToEdit && (
                <>
                  <div>
                    <label>Event Name:</label>
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Image Upload:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setImageFile(e.target.files[0]);
                          setImageUrl(URL.createObjectURL(e.target.files[0])); // Preview the image
                        }
                      }}
                    />
                    <img
                      src={eventDataToEdit.imageUrl}
                      alt="Current Event"
                      style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                  </div>
                  <div>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Edit Event</button>
                  <button type="button" onClick={handleRemoveEvent}>Remove Event</button>
                </>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;

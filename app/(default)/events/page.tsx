"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/Firebase'; // Removed auth import since admin logic is no longer needed
import { collection, addDoc, getDocs, orderBy, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './EventCard.css';
import Image from 'next/image';  // Importing Image component from next/image

interface Event {
  eventName: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  id?: string;
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

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, 'events'), orderBy('startDate'));
      const querySnapshot = await getDocs(q);
      const eventsList: Event[] = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data() as Event;
        eventData.id = doc.id;
        eventsList.push(eventData);
      });
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

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
      setImageFile(null);
    } catch (error) {
      console.error('Error updating event: ', error);
    }
  };

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

  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDate) > currentDate);
  const ongoingEvents = events.filter(event => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.endDate) < currentDate);

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
                    <Image
                      src={event.imageUrl || 'https://via.placeholder.com/150'}
                      alt={event.eventName || 'Event image'}
                      width={300}
                      height={200}
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
                <Image
                  src={event.imageUrl || 'https://via.placeholder.com/150'}
                  alt={event.eventName || 'Event image'}
                  width={300}
                  height={200}
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
                  setImageUrl(URL.createObjectURL(e.target.files[0]));
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
                      setImageUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <Image
                  src={eventDataToEdit.imageUrl}
                  alt="Current Event"
                  width={100}
                  height={100}
                  style={{ marginTop: '10px' }}
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
    </div>
  );
};

export default EventCard;

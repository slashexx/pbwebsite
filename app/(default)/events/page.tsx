"use client";

import React, { useState, useEffect } from "react";
import { db, auth, storage } from "@/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import "./EventCard.css";
import Image from "next/image";

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
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventDataToEdit, setEventDataToEdit] = useState<Event | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Fetch admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          try {
            const adminDocRef = doc(db, "admin", uid);
            const adminDocSnap = await getDoc(adminDocRef);
            if (adminDocSnap.exists()) {
              setIsAdmin(true);
            }
          } catch (error) {
            console.log("Error getting document:", error);
          }
        }
      });
    };

    checkAdminStatus();
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, "events"), orderBy("startDate"));
      const querySnapshot = await getDocs(q);
      const eventsList: Event[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Event[];
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  const uploadImage = async (file: File) => {
    const imageRef = ref(storage, `eventImages/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imageUrl = imageFile ? await uploadImage(imageFile) : "";
      const newEvent: Event = {
        eventName,
        description,
        imageUrl,
        startDate,
        endDate,
      };

      const docRef = await addDoc(collection(db, "events"), newEvent);
      setEvents((prevEvents) =>
        [...prevEvents, { ...newEvent, id: docRef.id }].sort(
          (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
      );

      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    try {
      const updatedImageUrl = imageFile ? await uploadImage(imageFile) : eventDataToEdit.imageUrl;
      const updatedEvent = {
        eventName,
        description,
        imageUrl: updatedImageUrl,
        startDate,
        endDate,
      };

      await updateDoc(doc(db, "events", eventDataToEdit.id), updatedEvent);
      setEvents((prevEvents) =>
        prevEvents
          .map((event) =>
            event.id === eventDataToEdit.id ? { ...updatedEvent, id: event.id } : event
          )
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      );

      setEditFormVisible(false);
      resetForm();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleRemoveEvent = async () => {
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    try {
      await deleteDoc(doc(db, "events", eventDataToEdit.id));
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventDataToEdit.id));
      setEditFormVisible(false);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEventToEditChange = (eventName: string) => {
    const selectedEvent = events.find((event) => event.eventName === eventName);
    if (selectedEvent) {
      setEventDataToEdit(selectedEvent);
      setEventName(selectedEvent.eventName);
      setDescription(selectedEvent.description);
      setImageUrl(selectedEvent.imageUrl);
      setStartDate(selectedEvent.startDate);
      setEndDate(selectedEvent.endDate);
    } else {
      setEventDataToEdit(null);
    }
  };

  const resetForm = () => {
    setEventName("");
    setDescription("");
    setImageFile(null);
    setImageUrl("");
    setStartDate("");
    setEndDate("");
    setFormVisible(false);
  };

  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.startDate) > currentDate);
  const ongoingEvents = events.filter(
    (event) => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate
  );
  const pastEvents = events.filter((event) => new Date(event.endDate) < currentDate);

  const renderEventCards = (events: Event[]) => {
    if (!events || events.length === 0) return <p>No events to display</p>;

    return (
      <div className="event-cards-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-inner">
              <div className="event-card-front">
                <div className="event-container">
                  <div className="event-poster-container">
                    <Image
                      width={300}
                      height={300}
                      src={event.imageUrl}
                      alt={event.eventName}
                      className="event-poster"
                    />
                  </div>
                  <div className="event-content-container">
                    <h3>{event.eventName}</h3>
                    <p>
                      {event.startDate} {event.endDate && ` - ${event.endDate}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="event-card-back">
                <Image
                  src={event.imageUrl || "https://via.placeholder.com/150"}
                  alt={event.eventName || "Event image"}
                  width={300}
                  height={200}
                />
                <p>{event.description || "No description available"}</p>
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
          <button
            className="toggle-form-button"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? "Hide Event Form" : "Add New Event"}
          </button>

          {formVisible && (
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
              {/* Form fields */}
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
              <button type="submit" className="submit-event-button">
                Add Event
              </button>
            </form>
          )}

          <button
            className="toggle-edit-button"
            onClick={() => setEditFormVisible(!editFormVisible)}
          >
            {editFormVisible ? "Hide Edit Form" : "Edit Event"}
          </button>

          {editFormVisible && (
            <form onSubmit={handleEditSubmit} style={{ marginBottom: "20px" }}>
              <div>
                <label>Select Event to Edit:</label>
                <select
                  value={eventToEdit}
                  onChange={(e) => {
                    setEventToEdit(e.target.value);
                    handleEventToEditChange(e.target.value);
                  }}
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.eventName}>
                      {event.eventName}
                    </option>
                  ))}
                </select>
              </div>
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
                    }
                  }}
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
              <button type="submit" className="update-event-button">
                Update Event
              </button>
              <button
                type="button"
                className="remove-event-button"
                onClick={handleRemoveEvent}
              >
                Remove Event
              </button>
            </form>
          )}
        </>
      )}

      <h2>Upcoming Events</h2>
      {renderEventCards(upcomingEvents)}

      <h2>Ongoing Events</h2>
      {renderEventCards(ongoingEvents)}

      <h2>Past Events</h2>
      {renderEventCards(pastEvents)}
    </div>
  );
};

export default EventCard;

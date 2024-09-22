"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/Firebase";
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
import { onAuthStateChanged } from "firebase/auth";
import "./EventCard.css";
import Image from "next/image";

interface Event {
  eventName: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  id?: string; // Add an optional ID field for Firestore document ID
}

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventDataToEdit, setEventDataToEdit] = useState<Event | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          try {
            const adminDocRef = await doc(db, "admin", uid);
            const adminDocSnap = await getDoc(adminDocRef);
            console.log("here =", adminDocSnap.exists());
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

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, "events"), orderBy("startDate"));
      const querySnapshot = await getDocs(q);
      const eventsList: Event[] = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data() as Event;
        eventData.id = doc.id; // Capture the document ID
        eventsList.push(eventData);
      });
      console.log(eventsList); // Log events to check data
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event = {
      eventName,
      description,
      imageUrl,
      startDate,
      endDate,
    };

    try {
      await addDoc(collection(db, "events"), newEvent);

      setEvents((prevEvents) =>
        [...prevEvents, newEvent].sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
      );

      setEventName("");
      setDescription("");
      setImageUrl("");
      setStartDate("");
      setEndDate("");

      setFormVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    try {
      const eventRef = doc(db, "events", eventDataToEdit.id);
      await updateDoc(eventRef, {
        eventName: eventToEdit,
        description: description,
        imageUrl: imageUrl,
        startDate: startDate,
        endDate: endDate,
      });

      setEvents((prevEvents) =>
        prevEvents
          .map((event) =>
            event.id === eventDataToEdit.id
              ? {
                  ...eventDataToEdit,
                  eventName,
                  description,
                  imageUrl,
                  startDate,
                  endDate,
                }
              : event
          )
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
      );

      setEditFormVisible(false);
      setEventToEdit("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleRemoveEvent = async () => {
    if (!eventDataToEdit || !eventDataToEdit.id) return;

    try {
      await deleteDoc(doc(db, "events", eventDataToEdit.id));
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventDataToEdit.id)
      );
      setEditFormVisible(false);
      setEventToEdit("");
    } catch (error) {
      console.error("Error deleting document: ", error);
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
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > currentDate
  );
  const ongoingEvents = events.filter(
    (event) =>
      new Date(event.startDate) <= currentDate &&
      new Date(event.endDate) >= currentDate
  );
  const pastEvents = events.filter(
    (event) => new Date(event.endDate) < currentDate
  );

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
                <p>{event.description}</p>
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
            {formVisible ? "Hide Form" : "Show Form"}
          </button>

          {formVisible && (
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
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
                <label>Image URL:</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
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
                />
              </div>
              <button type="submit">Add Event</button>
            </form>
          )}

          <button onClick={() => setEditFormVisible(!editFormVisible)}>
            {editFormVisible
              ? "Hide Edit/Remove Form"
              : "Show Edit/Remove Form"}
          </button>

          {editFormVisible && (
            <form onSubmit={handleEditSubmit} style={{ marginBottom: "20px" }}>
              <div>
                <label>Event Name to Edit/Remove:</label>
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
                    <label>Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Image URL:</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
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
                    />
                  </div>
                  <button type="submit">Update Event</button>
                  <button type="button" onClick={handleRemoveEvent}>
                    Remove Event
                  </button>
                </>
              )}
            </form>
          )}
        </>
      )}

      <h2>Ongoing Events</h2>
      {renderEventCards(ongoingEvents)}

      <h2>Upcoming Events</h2>
      {renderEventCards(upcomingEvents)}

      <h2>Past Events</h2>
      {renderEventCards(pastEvents)}
    </div>
  );
};

export default EventCard;

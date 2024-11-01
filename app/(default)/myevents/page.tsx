"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../../../Firebase"; // Firebase setup
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import EventForm from "../../../components/EventForm";
import EventUpdateForm from "../../../components/EventUpdateForm";
import EventCard from "../../../components/EventCard"; // Import new EventCard component
import Sidebar from "../../../components/Sidebar"; // Import Sidebar component
// import Image from "next/image";

const EventsPage = () => {
  const [showForm, setShowForm] = useState(false); // For toggling form visibility
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [events, setEvents] = useState<
    {
      id: string;
      eventName: string;
      description: string;
      eventDate: string;
      lastDateOfRegistration: string;
      dateCreated: string;
      dateModified: string;
      imageURL: string; // Adding imageURL field
      registrationLink: string;
    }[]
  >([]);

  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    eventName: string;
    description: string;
    eventDate: string;
    lastDateOfRegistration: string;
    dateCreated: string;
    dateModified: string;
    imageURL: string;
    registrationLink: string;
  } | null>(null); // For sidebar details

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  useEffect(() => {
    const checkAdmin = async (uid: string) => {
      try {
        const docRef = doc(db, "admin", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
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

    return () => unsubscribe();
  }, []);

  // Fetching data from Firebase
  const fetchEvents = async () => {
    const eventsCollection = collection(db, "myEvents");
    const eventSnapshot = await getDocs(eventsCollection);

    const eventList = eventSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        eventName: data.eventName || "",
        description: data.description || "",
        eventDate: data.eventDate || "",
        lastDateOfRegistration: data.lastDateOfRegistration || "",
        dateCreated: data.dateCreated || "",
        dateModified: data.dateModified || "",
        imageURL: data.imageURL || "",
        registrationLink: data.registrationLink || "", // Include registrationLink
      };
    });

    setEvents(eventList);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Deleting an event
  const deleteEvent = async (eventId: string) => {
    await deleteDoc(doc(db, "myEvents", eventId));
    fetchEvents(); // Refresh event list
  };

  const handleEventSelect = (event: {
    id: string;
    eventName: string;
    description: string;
    eventDate: string;
    lastDateOfRegistration: string;
    dateCreated: string;
    dateModified: string;
    imageURL: string;
    registrationLink: string; // Ensure registrationLink is included
  }) => {
    setSelectedEvent(event);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  // Dividing events into Past, Present, and Future based on eventDate
  const today = new Date();

  const pastEvents = events.filter(
    (event) => new Date(event.eventDate) < today
  );
  const presentEvents = events.filter(
    (event) => new Date(event.eventDate).toDateString() === today.toDateString()
  );
  const futureEvents = events.filter(
    (event) => new Date(event.eventDate) > today
  );

  return (
    <div className="p-4 pt-20 relative">
      <h1 className="text-5xl font-bold mb-2 pl-5 pt-2 text-center">Events</h1>
      <div className="flex justify-end">
        {isAdminLoggedIn && (
          <button
            onClick={() => setShowForm(!showForm)} // Toggles the form visibility
            className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
          >
            Add Event
          </button>
        )}
      </div>

      {/* Event Form to Add New Event */}
      {isAdminLoggedIn && showForm && <EventForm />}

      {/* Displaying the Events */}
      <div className="mt-2">
        {/* Present Events */}
        

        {/* Future Events */}
        {/* <h2 className="text-2xl font-bold mb-4 mt-8">CurreEvents</h2> */}
        {futureEvents.length > 0 ? (
          <div className="flex justify-around">
            {futureEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAdminLoggedIn={isAdminLoggedIn}
                onDelete={deleteEvent}
                onSelect={handleEventSelect}
              />
            ))}
          </div>
        ) : (
          <p>No presents events available.</p>
        )}
      </div>

      {/* Past Events */}
      <h2 className="text-3xl font-bold mb-8 mt-16 ml-4 text-center">Past Events</h2>
      {pastEvents.length > 0 ? (
        <div className="sm:flex justify-around">
          {pastEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdminLoggedIn={isAdminLoggedIn}
              onDelete={deleteEvent}
              onSelect={handleEventSelect} // Pass handleEventSelect to open sidebar
            />
          ))}
        </div>
      ) : (
        <p>No past events available.</p>
      )}

      {/* Sidebar for Event Details */}
      {isSidebarOpen && selectedEvent && (
        <Sidebar
          event={selectedEvent}
          onClose={handleSidebarClose}
          registrationLink={selectedEvent.registrationLink} // Pass registrationLink explicitly
        />
      )}

      {/* Event Update Form */}
      {isAdminLoggedIn && selectedEvent && (
        <div className="mt-8 z-50">
          <h2 className="text-2xl font-bold mb-4">Update Event</h2>
          <EventUpdateForm
            eventId={selectedEvent.id}
            initialEventData={selectedEvent}
          />
        </div>
      )}
    </div>
  );
};

export default EventsPage;

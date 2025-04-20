import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css'; // ⬅️ Importing the CSS

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;

    try {
      await axios.post(`http://localhost:5000/api/events/register/${eventId}`, { userId });
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Available Events</h2>
      {events.length === 0 ? (
        <p className="event-list-empty">No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="event-list-card">
            <h3 className="event-card-title">{event.title}</h3>
            <p className="event-card-description">{event.description}</p>
            <p className="event-card-detail">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="event-card-detail">📍 Location: {event.location}</p>
            <p className="event-card-detail">👥 Max Participants: {event.maxParticipants}</p>
            <button className="event-card-button" onClick={() => handleRegister(event._id)}>Register</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;

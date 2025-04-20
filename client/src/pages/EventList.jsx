import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      await axios.post(`http://localhost:5000/api/events/${eventId}/register`, { userId });
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Available Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Max Participants: {event.maxParticipants}</p>
            <button onClick={() => handleRegister(event._id)}>Register</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;

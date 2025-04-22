import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [paymentType, setPaymentType] = useState('All');

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
      setFilteredEvents(res.data);
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

  useEffect(() => {
    let filtered = events;

    if (category !== 'All') {
      filtered = filtered.filter((event) => event.category.toLowerCase() === category.toLowerCase());
    }

    if (paymentType !== 'All') {
      filtered = filtered.filter((event) => event.paymentType.toLowerCase() === paymentType.toLowerCase());
    }

    if (search.trim() !== '') {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [search, category, paymentType, events]);

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Available Events</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="category-buttons">
          <button onClick={() => setCategory('All')}>All</button>
          <button onClick={() => setCategory('Technical')}>Technical</button>
          <button onClick={() => setCategory('Non-Technical')}>Non-Technical</button>
        </div>

        <div className="payment-buttons">
          <button onClick={() => setPaymentType('All')}>All</button>
          <button onClick={() => setPaymentType('Free')}>Free</button>
          <button onClick={() => setPaymentType('Paid')}>Paid</button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="event-list-empty">No events found.</p>
      ) : (
        filteredEvents.map((event) => (
          <div key={event._id} className="event-list-card">
            <h3 className="event-card-title">{event.title}</h3>
            <p className="event-card-description">{event.description}</p>
            <p className="event-card-detail">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="event-card-detail">📍 Location: {event.location}</p>
            <p className="event-card-detail">👥 Max Participants: {event.maxParticipants}</p>
            <p className="event-card-detail">🧩 Category: {event.category}</p>
            <p className="event-card-detail">💰 Payment: {event.paymentType}</p>
            <button className="event-card-button" onClick={() => handleRegister(event._id)}>Register</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;

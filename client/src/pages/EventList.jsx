import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [paymentType, setPaymentType] = useState('All');
  const navigate = useNavigate();

  const today = new Date();

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
      navigate('/registered-events');
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

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= today);
  const completedEvents = filteredEvents.filter(event => new Date(event.date) < today);

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

      <h3>Upcoming Events</h3>
      {upcomingEvents.length === 0 ? (
        <p className="event-list-empty">No upcoming events found.</p>
      ) : (
        upcomingEvents.map((event) => (
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

      <h3>Completed Events</h3>
      {completedEvents.length === 0 ? (
        <p className="event-list-empty">No completed events.</p>
      ) : (
        completedEvents.map((event) => (
          <div key={event._id} className="event-list-card completed-event">
            <h3 className="event-card-title">{event.title}</h3>
            <p className="event-card-description">{event.description}</p>
            <p className="event-card-detail">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="event-card-detail">📍 Location: {event.location}</p>
            <p className="event-card-detail">👥 Max Participants: {event.maxParticipants}</p>
            <p className="event-card-detail">🧩 Category: {event.category}</p>
            <p className="event-card-detail">💰 Payment: {event.paymentType}</p>
            <p className="completed-label">✔ Completed</p>
          </div>
        ))
      )}
    </div>
  );
};


export default EventList;

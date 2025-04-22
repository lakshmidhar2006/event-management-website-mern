import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyEvents.css';

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [paymentType, setPaymentType] = useState('All');

  const fetchMyEvents = async () => {
    const token = localStorage.getItem('token');
    const organizerId = JSON.parse(atob(token.split('.')[1])).id;

    try {
      const res = await axios.get(`http://localhost:5000/api/events/organizer/${organizerId}`);
      setMyEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const filtered = myEvents.filter(event => {
    return (
      (category === 'All' || event.category.toLowerCase() === category.toLowerCase()) &&
      (paymentType === 'All' || event.paymentType.toLowerCase() === paymentType.toLowerCase()) &&
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="my-events-container">
      <h2 className="my-events-title">My Hosted Events</h2>

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

      {filtered.length === 0 ? (
        <p className="no-events-text">You haven't hosted any events yet.</p>
      ) : (
        filtered.map((event) => (
          <div key={event._id} className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <p className="event-category">Category: {event.category}</p>
            <p className="event-payment">Payment: {event.paymentType}</p>
            <p className="event-participants">Participants Registered: {event.participants.length}</p>

            <details className="participants-details">
              <summary>See Registered Users</summary>
              {event.participants.length === 0 ? (
                <p className="no-participants-text">No one registered yet.</p>
              ) : (
                <ul className="participants-list">
                  {event.participants.map((user) => (
                    <li key={user._id}>{user.name} – {user.email}</li>
                  ))}
                </ul>
              )}
            </details>
          </div>
        ))
      )}
    </div>
  );
};

export default MyEvents;

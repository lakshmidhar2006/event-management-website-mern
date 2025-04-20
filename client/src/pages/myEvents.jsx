import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

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

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div>
      <h2>My Hosted Events</h2>
      {myEvents.length === 0 ? (
        <p>You haven't hosted any events yet.</p>
      ) : (
        myEvents.map((event) => (
          <div key={event._id} style={{ border: '1px solid gray', margin: '15px 0', padding: '10px' }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Participants Registered: {event.participants.length}</p>

            <details>
              <summary>See Registered Users</summary>
              {event.participants.length === 0 ? (
                <p>No one registered yet.</p>
              ) : (
                <ul>
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

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid gray' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
      <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
      {token && (
        <>
          <Link to="/host-event" style={{ marginRight: '15px' }}>Host Event</Link>
          <Link to="/events" style={{ marginRight: '15px' }}>View Events</Link>
          <Link to="/my-events" style={{ marginRight: '15px' }}>My Events</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;

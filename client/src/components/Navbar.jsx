import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Adjust the path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      background: 'linear-gradient(62deg, #8EC5FC 0%, #e0c3fc 100%)',
      fontFamily: 'Poppins',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid gray'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={Logo} alt="Eventhon" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <h2 style={{ margin: 0 }}>Eventhon</h2>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        

        {!token && (
          <>
            <Link to="/signup" style={linkStyle}>Register</Link>
            <Link to="/" style={linkStyle}>Login</Link>
          </>
        )}
{token && (
  <><Link to="/home" style={linkStyle}>Home</Link>
    <Link to="/host-event" style={{ marginRight: '15px' }}>Host Event</Link>
    <Link to="/events" style={{ marginRight: '15px' }}>View Events</Link>
    <Link to="/my-events" style={{ marginRight: '15px' }}>My Events</Link>
    <Link to="/registered-events" style={{ marginRight: '15px' }}>Registered Events</Link>
    <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
  </>
)}

      </div>
    </nav>
  );
};

// 🔹 Reusable styles
const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontWeight: '500',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '15px'
};

export default Navbar;

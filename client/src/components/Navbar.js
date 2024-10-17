import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Helper function to check if the current route matches
  const isActive = (path) => location.pathname === path;

  // Customized button style with unique shadow and gradient effects
  const customButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 25px',
    border: '2px solid #fff',  // White border
    color: '#fff',  // White text color
    background: 'linear-gradient(145deg, #1c1c1c, #333333)',  // Subtle gradient background
    borderRadius: '50px',  // Rounded pill-shaped buttons
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '0.4s ease',
    fontSize: '17px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',  // Unique shadow for depth
  };

  // Hover effect with subtle animation
  const hoverEffect = {
    // backgroundColor: '#fff',
    color: '#fff',
    transform: 'scale(1.05)',  // Slight scaling effect
    boxShadow: '0 6px 20px rgba(255, 255, 255, 0.4)',  // Highlight shadow effect
  };

  // Navbar container style with more spacing and alignment
  const navbarStyle = {
    backgroundColor: '#121212',  // Darker background for a sleek look
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  // Logo styling with modern touch
  const logoStyle = {
    color: '#fff',
    fontSize: '28px',
    fontWeight: '900',  // Bolder logo
    letterSpacing: '2px',  // Spacing to make the logo stand out
    textTransform: 'uppercase',
  };

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <Link to="/" style={logoStyle}>
        Habit Tracker App
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '25px' }}>
        <Link
          to="/"
          style={{
            ...customButtonStyle,
            ...(isActive('/') ? hoverEffect : {}),
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/habbits"
          style={{
            ...customButtonStyle,
            ...(isActive('/habbits') ? hoverEffect : {}),
          }}
        >
          Habbits
        </Link>
        <Link
          to="/goals"
          style={{
            ...customButtonStyle,
            ...(isActive('/goals') ? hoverEffect : {}),
          }}
        >
          Goals
        </Link>
      </div>

      {/* User Authentication Buttons */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                style={{
                  ...customButtonStyle,
                  ...(isActive('/admin') ? hoverEffect : {}),
                }}
              >
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              style={{
                ...customButtonStyle,
                backgroundColor: '#fff',  // Active button background
                color: '#fff',  // Active text color
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.6)',  // Brighter shadow for active state
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={customButtonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverEffect)}
              onMouseLeave={(e) => Object.assign(e.target.style, customButtonStyle)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={customButtonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverEffect)}
              onMouseLeave={(e) => Object.assign(e.target.style, customButtonStyle)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

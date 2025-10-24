import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser, getUser } from '../utils/auth.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/chat" className="nav-brand">
            Health Chatbot
          </Link>
          
          <div className="nav-items">
            {user && (
              <>
                <span className="nav-user">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
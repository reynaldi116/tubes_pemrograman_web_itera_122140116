import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          MyKuliner
        </Link>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <span className="navbar-user">Halo, {user?.name || 'Pengguna'}!</span>
              </li>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-links">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/add-review" className="navbar-links">
                  Tambah Review
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-links">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-links">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
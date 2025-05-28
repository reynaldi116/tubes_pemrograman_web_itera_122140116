import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout.jsx';
import Navbar from '../components/Layout/Navbar.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AddReviewPage from '../pages/AddReviewPage.jsx';
import EditReviewPage from '../pages/EditReviewPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { useAuth } from '../hooks/useAuth.js';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Selamat Datang di MyKuliner</h1>
            <p>Silakan login atau register untuk melanjutkan.</p>
            <Link to="/login" className="button-primary" style={{marginRight: '10px', textDecoration: 'none'}}>Login</Link>
            <Link to="/register" className="button-secondary" style={{textDecoration: 'none'}}>Register</Link>
        </div>
    );
};

const NavbarWrapper = ({children}) => {
    return (
        <>
            <Navbar />
            {children}
            {/* Footer bisa ditambahkan di sini jika halaman publik juga punya footer standar */}
        </>
    )
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Publik dengan Navbar */}
      <Route path="/" element={<NavbarWrapper><HomePage /></NavbarWrapper>} />
      <Route path="/login" element={<NavbarWrapper><LoginPage /></NavbarWrapper>} />
      <Route path="/register" element={<NavbarWrapper><RegisterPage /></NavbarWrapper>} />

      {/* Rute Privat di dalam MainLayout (MainLayout sudah punya Navbar sendiri) */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}> {/* MainLayout sudah mencakup Navbar & Footer */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-review" element={<AddReviewPage />} />
          <Route path="/edit-review/:reviewId" element={<EditReviewPage />} />
        </Route>
      </Route>

      {/* Rute Not Found dengan Navbar */}
      <Route path="*" element={<NavbarWrapper><NotFoundPage /></NavbarWrapper>} />
    </Routes>
  );
};

export default AppRoutes;
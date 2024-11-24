import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Marketplace from './components/Marketplace';
import Content from './components/Content';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound'; // Create this component for unmatched routes

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'mugendievans10@gmail.com';
      setIsAdmin(user?.email === adminEmail);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 font-semibold">Loading... Please wait</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/content" element={<Content />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />} />
          <Route path="/admin-login" element={<AdminLogin onLogin={() => setIsAdmin(true)} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

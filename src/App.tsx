import React, { useState, useEffect } from 'react';
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

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === 'enkysolutions2019@gmail.com');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle different routes
  const path = window.location.pathname;

  if (path === '/admin') {
    return isAdmin ? <AdminPanel /> : <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  if (path === '/login') {
    return <Login />;
  }

  if (path === '/signup') {
    return <SignUp />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Marketplace />
      <Content />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import PasswordProtection from './components/PasswordProtection';
import { motion } from 'framer-motion';
import { RiRobot2Line, RiLogoutBoxRLine } from 'react-icons/ri';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="app-wrapper">
      <div className="floating-elements">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <header className="top-header">
        <motion.div 
          className="logo-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RiRobot2Line className="logo-icon" />
          <div className="title-container">
            <span className="logo-text">Jarvis</span>
            <span className="pro-badge">PRO</span>
          </div>
        </motion.div>
        
        <motion.button
          className="logout-button"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RiLogoutBoxRLine className="logout-icon" />
          <span className="logout-text">Logout</span>
        </motion.button>
      </header>

      <main className="main-container">
        <Chat />
      </main>
    </div>
  );
};

export default App;
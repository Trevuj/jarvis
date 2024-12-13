import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiLockLine, RiShieldCheckLine } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';

const PasswordProtection = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const validPasswords = ['trevuj123', 'towhid3d', 'mukut3d'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    setError('');

    // Simulate security check
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validPasswords.includes(password)) {
      setIsChecking(false);
      localStorage.setItem('isAuthenticated', 'true');
      onAuthenticated(true);
    } else {
      setError('Access Denied: Invalid Security Key');
      setIsChecking(false);
    }
  };

  return (
    <motion.div 
      className="password-protection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="password-container">
        <motion.div
          className="lock-icon-wrapper"
          animate={{
            scale: isChecking ? [1, 1.1, 1] : 1,
            rotate: isChecking ? [0, 360] : 0,
          }}
          transition={{ duration: 1, repeat: isChecking ? Infinity : 0 }}
        >
          {isChecking ? <RiShieldCheckLine className="lock-icon checking" /> : <RiLockLine className="lock-icon" />}
        </motion.div>
        
        <h2 className="security-title">Security Verification</h2>
        <p className="security-subtitle">Enter security key to access the AI Assistant</p>
        
        <form onSubmit={handleSubmit} className="security-form">
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter security key"
              className="password-input"
              disabled={isChecking}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isChecking}
          >
            {isChecking ? 'Verifying...' : 'Verify Access'}
          </motion.button>
        </form>

        <div className="contact-section">
          <p className="contact-text">
            Want your custom AI assistant? Contact us for personalized solutions.
          </p>
          <motion.a
            href="https://www.facebook.com/professorrehan"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook className="facebook-icon" />
            <span>Contact Professor Rehan</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordProtection;
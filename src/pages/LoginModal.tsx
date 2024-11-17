// Import necessary modules
import React, { useState } from 'react';
import './LoginModal.scss';

// Define the component props interface
interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
}

// Define the component
const LoginModal: React.FC<LoginModalProps> = ({ show, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication logic
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
        
      onLogin();
      onClose();
    } else {
        // console.log(process.env.REACT_APP_USERNAME);
        // console.log(process.env.REACT_APP_PASSWORD);
      alert('Invalid credentials');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="modal-buttons">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the component
export default LoginModal;
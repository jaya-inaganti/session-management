// Dashboard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [message, setMessage] = useState('User logged in already');
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('userSession');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleLogout();
      setMessage('User inactive for more than 5 mins, logged user out');
    }, 300000); // 5 minutes

    return () => clearTimeout(timeoutId);
  }, [handleLogout]);

  if (!isAuthenticated) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

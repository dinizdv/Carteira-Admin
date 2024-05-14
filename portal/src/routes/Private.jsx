import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('keyToken');
    if (storedToken) {
      setUser(true); // user authenticated
    } else {
      setUser(false); // user not authenticated
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default Private;

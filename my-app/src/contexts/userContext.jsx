// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    // Fetch user profile from backend to check if profile is complete
    const profile = await fetchUserProfile(userData.id);
    setUser({ ...userData, profile });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

// Mock function to fetch user profile from backend
const fetchUserProfile = async (userId) => {
  // Fetch user profile logic here
  return {
    // profile fields
    completed: false,
  };
};

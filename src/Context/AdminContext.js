import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminInfo = localStorage.getItem("AdminInfo");
    if (adminInfo) {
      setAdmin(adminInfo);
    }
  }, []);

  const setAdminInfo = (info) => {
    setAdmin(info);
    localStorage.setItem("AdminInfo", info);
  };

  const removeAdminInfo = () => {
    setAdmin(null);
    localStorage.removeItem("AdminInfo");
  };

  return (
    <AuthContext.Provider value={{ admin, setAdminInfo, removeAdminInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

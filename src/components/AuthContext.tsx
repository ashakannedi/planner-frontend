import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  Email: string | null ;
  role: string | null;
  login: (Email: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  const login = (Email: string, role: string) => {
    setEmail(Email);
    setRole(role);
    localStorage.setItem('email', Email);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setEmail(null);
    setRole(null);
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ Email, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

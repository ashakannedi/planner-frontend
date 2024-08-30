import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { lockClosedOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Loginform.css';

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state for displaying errors
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [logoutMessage, setLogoutMessage] = useState(""); 
  const [role, setRole] = useState('');// State for logout message
  const history = useHistory();
  const location = useLocation();


  const handleLoginrole = () => {
    
    localStorage.setItem('role', role);
    history.push('/');
  };
  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      try {
        await axios.get("http://localhost:8080/userDetails/user/{id}", { withCredentials: true });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // Check for logout message in the URL
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('logout') === 'true') {
      setLogoutMessage("You have been logged out successfully.");
    }
  }, [location.search]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/userDetails/login", {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,  // Ensure cookies are sent with the request
      });
      console.log("Response data:", response.data);
      setEmail("");
      setPassword("");
      setIsLoggedIn(true); // Update login state
      history.push('/navbar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ');
    } catch (error) {
      const err = error as AxiosError; // Type assertion
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred during login");
      }
      console.error("Error during login:", err.response ? err.response.data : err.message);
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/userDetails/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      history.push('/login?logout=true');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="logo.png" alt="Login Illustration" />
      </div>
      <div className="login-form">
        <h2>{isLoggedIn ? "Welcome Back!" : "Login"}</h2>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            {logoutMessage && <p className="logout-message">{logoutMessage}</p>}
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <div className="input-item">
                <IonIcon icon={personCircleOutline} className="icon" />
                <input
                  type="email"
                  id="email"
                  className="underline-input"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-item">
                <IonIcon icon={lockClosedOutline} className="icon" />
                <input
                  type="password"
                  id="password"
                  className="underline-input"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
             <option value="user">User</option>
              <option value="admin">Admin</option>
             </select></div>
      
            </div>
            <button type="submit" className="submit-button" >Login</button>
            {error && <p className="error-message">{error}</p>}
            <div className="center">
              <span>OR</span>
            </div>
            <div className="register-link">
              <p>Don’t have an account? <a href="/register">Register</a></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Loginform;


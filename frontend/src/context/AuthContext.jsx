import axios from "axios";
import Cookies from "js-cookie"; // Import the library
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../apiconfig";
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseUrl}user/login`, inputs);

      const token = res?.data?.token;

      if (token) {
        setCurrentUser((prevUser) => {
          const newUser = res.data;
          localStorage.setItem("user", JSON.stringify(newUser));
          return newUser;
        });
        // Update localStorage after setting currentUser
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseUrl}user/logout`);

      Cookies.remove("access_token");
      localStorage.removeItem("user");

      setCurrentUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  useEffect(() => {
    setCurrentUser((prevUser) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      return storedUser;
    });

  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
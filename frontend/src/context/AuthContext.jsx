import axios from "axios";
import Cookies from "js-cookie"; // Import the library
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const baseUrl = "https://mindful-gurukul.onrender.com/api/";
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseUrl}user/login`, inputs);


      const setCookieHeader = res?.headers?.["set-cookie"];
      
      if (setCookieHeader) {
        const token = setCookieHeader.split("access_token=")[1].split(";")[0];
        if (token) {
          console.log("Access Token:", token); 
          Cookies.set("access_token", token, {
            //secure: true,    //apply if site running on secure https
            sameSite: "None"
          })
          const accessToken = Cookies.get("access_token");
          console.log("Access Token:", accessToken);

          setCurrentUser(res.data);
        }
        else {
          console.error("token not found in the Set-Cookie header.");
        }
      } else {
        console.error("Set-Cookie header not found in the response.");
      }


    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseUrl}user/logout`);

      // Use js-cookie to clear the token
      Cookies.remove("access_token");

      setCurrentUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

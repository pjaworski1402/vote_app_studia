import React, { useState } from "react";
    import { AuthContext } from "../context/AuthContext";
    import { message } from "antd";
    import { API, BEARER } from "../helpers/constant";
    import { useEffect } from "react";
    import { getToken } from "../helpers/token";
    
    const AuthProvider = ({ children }) => {
      const [userData, setUserData] = useState();
      const [isLoading, setIsLoading] = useState(false);
    
      const authToken = getToken();
    
      const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API}/users/me`, {
            headers: { Authorization: `${BEARER} ${token}` },
          });
          const data = await response.json();
          data.token = `${BEARER} ${token}`
          setUserData(data);
        } catch (error) {
          console.error(error);
          message.error("Error While Getting Logged In User Details");
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleUser = (user) => {
        setUserData(user);
      };
    
      useEffect(() => {
        if (authToken) {
          fetchLoggedInUser(authToken);
        }
      }, [authToken]);
    
      return (
        <AuthContext.Provider
          value={{ user: userData, setUser: handleUser, isLoading }}
        >
          {children}
        </AuthContext.Provider>
      );
    };
    
    export default AuthProvider;
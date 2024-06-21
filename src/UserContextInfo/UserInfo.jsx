import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const token = localStorage.getItem("Token");
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [currentUser, setCurrentUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8089/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const singleUser = response.data.singleUser;
      const formattedData = Array.isArray(singleUser)
        ? singleUser.map((user) => ({
          ...user,
          image: user.image ? user.image.replace(/\\/g, "/") : null,
        }))
        : {
          ...singleUser,
          image: singleUser.image ? singleUser.image.replace(/\\/g, "/") : null,
        };
      
      setCurrentUser(formattedData);
    } catch (error) {
      console.log("Error fetching user info:", error.message);
    }
  };

  const updateUserInfo = (updatedUser) => {
    const formattedUser = {
      ...updatedUser,
      image: updatedUser.image ? updatedUser.image.replace(/\\/g, "/") : null,
    };
    setCurrentUser(formattedUser);
  };

  useEffect(() => {
    if (authUser && token) {
      getUserInfo();
    }
  }, [token, authUser]);

  return (
    <UserInfoContext.Provider value={{ currentUser, updateUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;

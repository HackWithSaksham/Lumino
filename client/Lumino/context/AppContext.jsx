import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();
export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [allbadges, setbadges] = useState([]);
  const [ideaid, setideaid] = useState(() => {
    return localStorage.getItem("ideaid") || "";
  });

  useEffect(() => {
    if (ideaid) localStorage.setItem("ideaid", ideaid);
  }, [ideaid]);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/userdata`, {
        withCredentials: true,
      });
      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllBadges = async () => {
    const result = await axios.get(`${backendUrl}/api/user/allbadge`);
    setbadges(result);
  };

  useEffect(() => {
    console.log("AppContextProvider useEffect called");
    getAuthState(), getAllBadges();
  }, []);

  const value = {
    ideaid,
    setideaid,
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    allbadges,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

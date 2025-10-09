import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const AppContent = createContext();
export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [allbadges, setbadges] = useState([]);
  const [ideaslist,setideaslist] = useState([]);
  const [ideaid, setideaid] = useState(() => {
    return localStorage.getItem("ideaid") || "";
  });
  const [contribution, setcontribution] = useState(null);

  const navigate = useNavigate();
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
      else {
      setIsLoggedin(false);
      setUserData(null);
    }
    } catch (error) {
      setIsLoggedin(false);
    setUserData(null);
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

  const handlelogout = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getideaslist = async()=>{
    const {data} = await axios.post(`${backendUrl}/api/user/ideaslist`,
      {withCredentials:true}
    );
    setideaslist(data.results);
  }

  useEffect(() => {
    getAuthState(), getAllBadges(),getideaslist();
  }, []);

  const value = {
    ideaslist,
    contribution,
    setcontribution,
    ideaid,
    handlelogout,
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

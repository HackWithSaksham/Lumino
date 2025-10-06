import axios from "axios";
import * as Icons from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../public/loginbg.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [country, setcountry] = useState("in");
  const [passion, setpassion] = useState("");
  const [image, setimage] = useState("");
  const [login, setlogin] = useState(true);
  const { isLoggedin, setIsLoggedin, getUserData, backendUrl } =
    useContext(AppContent);
  const navigate = useNavigate();
  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }
  const handleSubmitlogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitregister = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", username);
      formdata.append("country", country);
      formdata.append("passion", passion);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("profileimage", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/register`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        navigate("/");
        toast.success(data.message);
        console.log(data.message);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen ">
      {login && (
        <div
          className="flex mx-50 mt-25 rounded-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="flex flex-col gap-17 w-[50%] text-white m-17">
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-5xl font-semibold">Where ideas</p>
                <p className="text-5xl font-semibold">find collaborators!!!</p>
              </div>
              <p className="text-lg font-extralight">
                Turn your ideas into reality by connecting with like-minded
                innovators across the globe
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-3 items-center">
                <Icons.Lightbulb size={30} className="text-white" />
                <p className="text-xl">Creation!</p>
              </div>
              <div className="flex gap-3 items-center">
                <Icons.Handshake size={30} className="text-white" />
                <p className="text-xl">Collaboration!</p>
              </div>
              <div className="flex gap-3 items-center">
                <Icons.ChartNetwork size={30} className="text-white" />
                <p className="text-xl">Correlation!</p>
              </div>
            </div>
          </div>

          <div className="gap-25 items-center w-[50%] text-white flex flex-col bg-[#25183C] rounded-2xl px-10 py-23">
            <p className="text-3xl font-bold">Login To Lumino</p>
            <div className="gap-13 items-center text-white flex flex-col w-full">
              <div className="flex flex-col gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                <div className="flex flex-col gap-1.5">
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md"
                  />
                  <NavLink
                    to="/reset-password"
                    className="text-[14px] px-4 text-white/50"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={(e) => handleSubmitlogin(e)}
                  className="px-30 py-2 text-white/50 rounded-md bg-[#140B2F]"
                >
                  Login
                </button>
                <button
                  onClick={() => setlogin(false)}
                  className="text-sm text-white/50"
                >
                  Don't have an account ? Create one
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!login && (
        <div
          className="flex mx-50 mt-25 rounded-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="flex flex-col gap-17 w-[50%] text-white m-17">
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-5xl font-semibold">Where ideas</p>
                <p className="text-5xl font-semibold">find collaborators!!!</p>
              </div>
              <p className="text-lg font-extralight">
                Turn your ideas into reality by connecting with like-minded
                innovators across the globe
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-3 items-center">
                <Icons.Lightbulb size={30} className="text-white" />
                <p className="text-xl">Creation!</p>
              </div>
              <div className="flex gap-3 items-center">
                <Icons.Handshake size={30} className="text-white" />
                <p className="text-xl">Collaboration!</p>
              </div>
              <div className="flex gap-3 items-center">
                <Icons.ChartNetwork size={30} className="text-white" />
                <p className="text-xl">Correlation!</p>
              </div>
            </div>
          </div>

          <div className="gap-25 items-center w-[50%] text-white flex flex-col bg-[#25183C] rounded-2xl px-10 py-23">
            <p className="text-3xl font-bold">Create Account</p>
            <div className="gap-13 items-center text-white flex flex-col w-full">
              <div className="flex flex-col gap-3 w-full">
                <input
                  type="text"
                  value={username}
                  placeholder="Enter Full Name"
                  onChange={(e) => setusername(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                <input
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                
                <div className="flex gap-3">
                  <input
                  type="text"
                  value={country}
                  placeholder="Select country"
                  onChange={(e) => setcountry(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                <input
                  type="text"
                  value={passion}
                  placeholder="Describe passion"
                  onChange={(e) => setpassion(e.target.value)}
                  className="bg-[#140B2F] text-white/50 text-[16px] px-4 py-2.5 rounded-md "
                />
                </div>
                
              </div>
              <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={(e) => handleSubmitregister(e)}
                    className="px-30 py-2 text-white/50 rounded-md bg-[#140B2F]"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setlogin(true)}
                    className="text-sm text-white/50"
                  >
                    Already have an account ? Login
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

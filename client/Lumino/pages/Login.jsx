import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";

const Login = () => {
  const { backendUrl } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        { withCredentials: true } // ✅ ensure cookies/session are sent
      );

      console.log(data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)} // ✅ correct
      />
      <input
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} // ✅ correct
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;

import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import { ToastContainer } from 'react-toastify';
import Idea from '../pages/Idea';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/idea" element={<Idea />} />
      </Routes>
    </div>
  )
}

export default App

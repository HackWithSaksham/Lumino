import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import { ToastContainer } from 'react-toastify';
import Idea from '../pages/Idea';
import Contribution from '../pages/Contribution';
import Requests from '../pages/Requests';
import AddContribution from '../pages/AddContribution';
import Message from '../pages/Message';
import MindMaps from '../pages/Mindmap';
import Collab from '../pages/Collab';
import ContributionsPage from '../pages/ContributionsPage';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/idea" element={<Idea />} />
        <Route path="/contribution" element={<Contribution />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/addcontribution" element={<AddContribution />} />
        <Route path="/chat" element={<Message />} />
        <Route path="/mindmaps" element={<MindMaps />} />
        <Route path="/requests" element={<Collab />} />
        <Route path="/collab" element={<ContributionsPage />} />
      </Routes>
    </div>
  )
}

export default App

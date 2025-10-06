import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from '../public/logo.png'
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex justify-between px-50 py-20">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-17 h-17" />
          <h3 className="text-3xl font-bold text-indigo-400">Lumino</h3>
        </div>
        <p className=" text-white/70 text-lg mt-3">From Spark to Structure</p>
        <div className="flex gap-4 mt-2">
          <FaTwitter className="text-[30px] text-white/70 hover:text-indigo-300" />
          <FaInstagram className="text-[30px] text-white/70 hover:text-indigo-300" />
          <FaLinkedin className="text-[30px] text-white/70 hover:text-indigo-300" />
        </div>
      </div>
    <div className="grid grid-cols-3 gap-20">
      <div>
        <h4 className="font-bold text-xl mb-10 text-white">Products</h4>
        <ul className="space-y-2.5 text-white/50 text-[16px]">
          <li>
            <NavLink to="/products/overview" className="hover:text-indigo-300">
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/notebook" className="hover:text-indigo-300">
              Notebook
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/collaboration" className="hover:text-indigo-300">
              Collaboration
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/mindmaps" className="hover:text-indigo-300">
              Mind Maps
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/ai-assistance" className="hover:text-indigo-300">
              AI Assistance
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/chat" className="hover:text-indigo-300">
              Real-time Chat
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-xl mb-10 text-white">Support</h4>
        <ul className="space-y-2.5 text-white/50 text-[16px]">
          <li>
            <NavLink to="/support/contact" className="hover:text-indigo-300">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/docs" className="hover:text-indigo-300">
              Documentation
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/chat-support" className="hover:text-indigo-300">
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/faq" className="hover:text-indigo-300">
              FAQs
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-xl mb-10 text-white">Legal</h4>
        <ul className="space-y-2.5 text-white/50 text-[16px]">
          <li>
            <NavLink to="/legal/terms" className="hover:text-indigo-300">
              Terms of Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/legal/privacy" className="hover:text-indigo-300">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/legal/cookies" className="hover:text-indigo-300">
              Cookie Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Footer;

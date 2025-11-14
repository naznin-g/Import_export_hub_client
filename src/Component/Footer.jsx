
import React from 'react';
import logo from "../assets/export_import.png";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa"; 
import { PiXLogoBold } from "react-icons/pi";


const Footer = () => {
  return (
    
    <footer className="bg-[#FfFfFf] text-neutral-content w-11/12 mx-auto p-10">
        
      <div className="flex justify-between flex-wrap gap-2">
        <aside className="flex items-center text-blue-400">
          <img src={logo} alt="Company Logo" className="w-12 h-12" />
          <h1 className="text-xl font-semibold text-blue-400">Export
            <span className="text-[#057151]">Import</span>Hub</h1>
        </aside>
        <div className="gap-3 text-xl font-semibold text-blue-400">
          
          <h1>Quick Links</h1>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Privacy Policy</h3>

        </div>

        <nav>
          <h1 className="text-xl text-blue-400 font-semibold mb-2">Social Links</h1>
          <div className="flex gap-4 text-2xl  text-blue-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600 transition-colors" />  
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <PiXLogoBold className="hover:text-sky-400 transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-300 transition-colors" />
            </a>
          </div>
        </nav>
      </div>

      <p className="text-center mt-6 text-sm  text-blue-400">
        Copyright © {new Date().getFullYear()} — GreenNest. All rights reserved
      </p>
      
    </footer>
    
  );
};

export default Footer;
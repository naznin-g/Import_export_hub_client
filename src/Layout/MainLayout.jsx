import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Component/Navbar.jsx";
import Footer from "../Component/Footer.js";
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="w-11/12 bg-[#f7f7f7] mx-auto">
      <Navbar />
      
      <Outlet /> 

      <Footer />

      
       <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default MainLayout;



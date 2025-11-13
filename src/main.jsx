import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Loader from "./Component/Loader.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <AuthProvider>
  <RouterProvider router={router} fallbackElement={<Loader />}   />
   </AuthProvider>
      
    
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Loader from "./Component/Loader.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider> {/* Wrap everything with ThemeProvider */}
      <AuthProvider>
        <RouterProvider 
          router={router} 
          fallbackElement={<Loader />} 
          hydrateFallbackElement={<Loader />} 
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);

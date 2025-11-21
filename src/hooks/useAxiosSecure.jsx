
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  
  const instance = axios.create({
    baseURL: "http://localhost:3000", 
  });

  useEffect(() => {
    
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    
    const responseInterceptor = instance.interceptors.response.use(
      (res) => res, 
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.log("Unauthorized! Logging out...");
          signOutUser().then(() => navigate("/register"));
        }
        return Promise.reject(error);
      }
    );

    
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate, instance]);

  return instance;
};

export default useAxiosSecure;

import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // make sure it's react-router-dom

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = instance.interceptors.request.use(config => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      res => res,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.log('Log out the user due to bad request');
          await signOutUser();
          navigate('/register');
        }
        return Promise.reject(error); 
      }
    );

    // Cleanup on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;

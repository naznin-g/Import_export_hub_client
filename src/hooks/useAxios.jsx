import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://import-export-hub-server-six.vercel.app',
  
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;

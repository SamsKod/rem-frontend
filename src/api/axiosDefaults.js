import axios from 'axios';

axios.defaults.baseURL = "https://rem-backend-api-933e70f9f3d2.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
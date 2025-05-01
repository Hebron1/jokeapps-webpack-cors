import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.BASE_URL,
    // baseURL: process.env.REACT_APP_API_BASE_URL || '/api'
    baseURL: isDev ? '/api' : 'https://secrets-api.appbrewery.com'
})

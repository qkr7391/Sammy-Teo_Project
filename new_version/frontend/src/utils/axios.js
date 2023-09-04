import axios from "axios";

// why we make axios instance?
// Not now, but we should use interseptor oneday.
const axiosInstance = axios.create({
    /* Now we are using vite. When using vite, if you want to use environment variables,
     you can enter the environment variables after import.meta.env. */
    baseURL: process.env.PROD ? "" : process.env.SERVER_URL,
});

export default axiosInstance;

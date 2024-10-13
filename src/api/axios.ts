import axios from "axios";
import ENV from "../config/env";

const axiosInstance = axios.create({
  baseURL: ENV.SERVER_API,
});

export default axiosInstance;

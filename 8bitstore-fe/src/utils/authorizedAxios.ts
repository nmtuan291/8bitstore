import axios from "axios";

let authorizedAxiosInstance = axios.create();

// request timeout after 10'
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;



export default authorizedAxiosInstance;
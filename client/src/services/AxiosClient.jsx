
import axios from "axios"

const AxiosClient = axios.create()

console.log("Environment variables =>", import.meta.env)

AxiosClient.defaults.baseURL = process.env.REACT_APP_SERVER_URL

AxiosClient.defaults.headers = {
    "Content-Type": "application/json",
};

export default AxiosClient
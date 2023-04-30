import axios from 'axios';

const BASE_URL = 'https://witwater-server.onrender.com'
const DEV_SERVER = "http://localhost:3500"

export default axios.create( {
      baseURL: BASE_URL
})
export const axiosPrivate = axios.create( {
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
})
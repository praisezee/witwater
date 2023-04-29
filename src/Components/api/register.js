import axios from 'axios';

const BASE_URL = 'https://witwater-server.onrender.com'
const DEV_SERVER = "http://localhost:3500"

export default axios.create( {
      baseURL: DEV_SERVER
})
export const axiosPrivate = axios.create( {
      baseURL: DEV_SERVER,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
})
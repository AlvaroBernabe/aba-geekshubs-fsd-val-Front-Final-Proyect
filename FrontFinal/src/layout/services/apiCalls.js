import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { userData } from '../userSlice';


const root = "http://localhost:8000/api";

export const registerUser = async (body) => {
  return await axios.post(`${root}/register`, body)
}
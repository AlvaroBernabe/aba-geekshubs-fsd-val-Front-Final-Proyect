import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { userData } from '../userSlice';
import api from './api';


const root = "http://localhost:8000/api";

export const registerUser = async (body) => {
  return await axios.post(`${root}/register`, body)
}

export const loginUser = async (body) => {
  return await api.post(`${root}/login`, body)
}


export const getMyProfile = async (token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/profile`, config)
}

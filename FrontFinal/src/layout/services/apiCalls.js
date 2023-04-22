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

export const getAllUsers = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/users/all`, config)
}


export const getAllGames = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/games/all/`, config)
}

export const loginUpdate = async (body, token) => {
  // console.log(body, "esto es body");
  // console.log(token, "esto es token");
  let config = {

    headers: { 
      'Authorization': `Bearer ${token}`,  
    }
  };
  return await axios.put(`${root}/updatelogin`, body, config)
}

export const profileUpdate = async (body, token) => {
  // console.log(body, "esto es body");
  // console.log(token, "esto es token");
  let config = {

    headers: { 
      'Authorization': `Bearer ${token}`,  
    }
  };
  return await axios.put(`${root}/profile/update`, body, config)
}

export const getMyFavourites = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/review/favourites`, config)
}
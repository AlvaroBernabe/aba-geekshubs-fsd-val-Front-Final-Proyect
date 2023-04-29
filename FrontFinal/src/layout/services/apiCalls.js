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


export const newReview = async ( body, token) => {
  // console.log("----------------------------------------------",)
  // console.log("esto vale body", body)
  // console.log("Esto vale tokensss:",token)
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }};
        return await axios.post(`${root}/review/new`,body, config)
}


export const getMyReviews = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/review/myreviews`, config)
}

export const getAllReviewsAdmin = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/reviews/all/`, config)
}

export const postNewGame = async ( body, token) => {
  // console.log("----------------------------------------------",)
  // console.log("esto vale body", body)
  // console.log("Esto vale tokensss:",token)
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }};
        return await axios.post(`${root}/game/new`,body, config)
}

export const changeRole = async (body, token) => {
  const { id, role_id } = body;
  // const userId = req.params.id
  const bodyParameters = {
    id: id,
    role_id: role_id,
          //       where: {
          // id: userId
          // }
    };
    
  const config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }}
  return await axios.put(`${root}/user/role/update`,  bodyParameters, config);
}

export const gameUpdate = async (id, body, token) => {
  const config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }}
  return await axios.put(`${root}/game/update/${id}`,  body, config);
}

export const gameDelete = async (id, token) => {
  const config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }}
  return await axios.delete(`${root}/game/${id}`, config);
}

export const logoutUser = async (token) => {
  // console.log(token, "soy apicalls token");
  let config = {

    headers: { 
      'Authorization': `Bearer ${token}`,  
    }
  };
    return await axios.post(`${root}/logout`, config)
}


export const getAllGamesWithoutReviewUser = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
    };
    return await axios.get(`${root}/games/all/user`, config)
}
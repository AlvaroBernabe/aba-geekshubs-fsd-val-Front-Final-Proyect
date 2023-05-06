import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Home } from "./layout/home/Home";
import { Register } from "./layout/register/Register";
import { Login } from "./layout/login/Login";
import { Profile } from "./layout/profile/Profile";
import { GetAllUsers } from "./layout/users/getAllUsers/GetAllUsers";
import { GetUsersDetails } from "./layout/users/getUsersDetails/GetUsersDetails";
import { ChangeLogin } from "./layout/users/changeLogin/ChangeLogin";
import { ProfileUpdate } from "./layout/profile/update/ProfileUpdate";
import { GetMyFavourites } from "./layout/users/GetMyFavourites";
import { NewReview } from "./layout/users/NewReview";
import { GetAllMyReviews } from "./layout/users/GetMyReviews";
import { GetAllAdminReviews } from "./layout/Reviews/GetAllAdminReviews";
import { NewGame } from "./layout/games/NewGame";
import { UpdateGame } from "./layout/games/UpdateGame";
import { GetAllGamesUser } from "./layout/games/getAllGamesUser/GetAllGamesUser";
import { ChangeRole } from "./layout/users/getAllUsers/ChangeRole";
import { GetAllGamesDefault } from "./layout/games/GetAllGamesDefault";
import { GetAllGamesAdmin } from "./layout/games/getAllGamesAdmin/GetAllGamesAdmin";
import { GetAllNews } from "./layout/GetAllNews";
import { NewNews } from "./layout/NewNews";
import { Header } from "./components/Header";
import NavBar from "./components/NavBar";
import { FooterBottom } from "./components/FooterBottom";
import { GetAllNewsAdmin } from "./layout/GetAllNewsAdmin";
import { UpdateNews } from "./layout/UpdateNews";

export const Router = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/update" element={<ChangeLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/profile/update/rol" element={<ChangeRole />} />
        <Route path="/users/all" element={<GetAllUsers />} />
        <Route path="/users/all/details" element={<GetUsersDetails />} />
        <Route path="/games/all" element={<GetAllGamesAdmin />} />
        <Route path="/gamesUser/all" element={<GetAllGamesUser />} />
        <Route path="/gamesnonUser/all" element={<GetAllGamesDefault />} />
        <Route path="/games/update" element={<UpdateGame />} />
        <Route path="/games/favourites" element={<GetMyFavourites />} />
        <Route path="/games/new" element={<NewGame />} />
        <Route path="/review/new" element={<NewReview />} />
        <Route path="/review/all" element={<GetAllMyReviews />} />
        <Route path="/reviews/all" element={<GetAllAdminReviews />} />
        <Route path="/news/all" element={<GetAllNews />} />
        <Route path="/news/all/admin" element={<GetAllNewsAdmin />} />
        <Route path="/news/new" element={<NewNews />} />
        <Route path="/news/all/update" element={<UpdateNews />} />
      </Routes>
      <FooterBottom />
    </>
  )
}


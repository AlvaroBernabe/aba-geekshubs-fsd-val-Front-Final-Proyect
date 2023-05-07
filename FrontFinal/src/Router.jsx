import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./layout/main/Home";
import { Register } from "./layout/main/Register";
import { Login } from "./layout/main/Login";
import NavBar from "./components/NavBar";
import { Header } from "./components/Header";
import { Profile } from "./layout/profile/Profile";
import { ProfileUpdate } from "./layout/profile/ProfileUpdate";
import { ChangeRole } from "./layout/admin/ChangeRole";
import { GetAllUsers } from "./layout/admin/GetAllUsers";
import { GetUsersDetails } from "./layout/admin/GetUsersDetails";
import { GetAllGamesAdmin } from "./layout/games/GetAllGamesAdmin";
import { GetAllGamesUser } from "./layout/games/GetAllGamesUser";
import { GetAllGamesDefault } from "./layout/games/GetAllGamesDefault";
import { UpdateGame } from "./layout/games/UpdateGame";
import { GetMyFavourites } from "./layout/users/GetMyFavourites";
import { NewGame } from "./layout/games/NewGame";
import { NewReview } from "./layout/users/NewReview";
import { GetAllMyReviews } from "./layout/users/GetMyReviews";
import { GetAllAdminReviews } from "./layout/Reviews/GetAllAdminReviews";
import { GetAllNews } from "./layout/main/GetAllNews";
import { GetAllNewsAdmin } from "./layout/admin/GetAllNewsAdmin";
import { NewNews } from "./layout/admin/NewNews";
import { UpdateNews } from "./layout/admin/UpdateNews";
import { FooterBottom } from "./components/FooterBottom";
import { ChangeLogin } from "./layout/profile/ChangeLogin";


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


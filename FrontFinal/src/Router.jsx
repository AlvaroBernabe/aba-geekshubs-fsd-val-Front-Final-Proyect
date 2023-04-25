import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Home } from "./layout/home/Home";
import { About } from "./layout/about/About";
import { Register } from "./layout/register/Register";
import { Login } from "./layout/login/Login";
import { Profile } from "./layout/profile/Profile";
import { GetAllUsers } from "./layout/users/getAllUsers/GetAllUsers";
import { GetUsersDetails } from "./layout/users/getUsersDetails/GetUsersDetails";
import { GetAllGames } from "./layout/games/getAllGames/GetAllGames";
import { ChangeLogin } from "./layout/users/changeLogin/ChangeLogin";
import { ProfileUpdate } from "./layout/profile/update/ProfileUpdate";
import { GetMyFavourites } from "./layout/users/GetMyFavourites";
import { NewReview } from "./layout/users/NewReview";
import { GetAllMyReviews } from "./layout/users/GetMyReviews";
import { GetAllAdminReviews } from "./layout/Reviews/GetAllAdminReviews";
import { NewGame } from "./layout/games/NewGame";
import { ChangeRole } from "./layout/profile/ChangeRole";
import { UpdateGame } from "./layout/games/UpdateGame";

export const Router = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/update" element={<ChangeLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<ProfileUpdate />} />
            <Route path="/profile/update/rol" element={<ChangeRole />} />
            <Route path="/users/all" element={<GetAllUsers />} />
            <Route path="/users/all/details" element={<GetUsersDetails />} />
            <Route path="/games/all" element={<GetAllGames />} />
            <Route path="/games/update" element={<UpdateGame />} />
            <Route path="/games/favourites" element={<GetMyFavourites />} />
            <Route path="/games/new" element={<NewGame />} />
            <Route path="/review/new" element={<NewReview />} />
            <Route path="/review/all" element={<GetAllMyReviews />} />
            <Route path="/reviews/all" element={<GetAllAdminReviews />} />
        </Routes>
        </>
    )
}


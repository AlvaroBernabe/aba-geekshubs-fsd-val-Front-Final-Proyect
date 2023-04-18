import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Home } from "./layout/home/Home";
import { About } from "./layout/about/About";
import { Register } from "./layout/register/Register";
import { Login } from "./layout/login/Login";
import { Profile } from "./layout/profile/Profile";

export const Router = () => {
    return (
        <>
        <hr />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        </>
    )
}


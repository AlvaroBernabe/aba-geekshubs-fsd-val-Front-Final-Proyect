import React from "react";
import './App.css'
import { Router } from "./Router";
import NavBar from "./components/NavBar";
import { FooterBottom } from "./components/FooterBottom";


export const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <hr />
      <Router/>
      <FooterBottom/>
    </div>
  )
};

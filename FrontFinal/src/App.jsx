import React from "react";
import { Router } from "./Router";
import NavBar from "./components/NavBar";
import { FooterBottom } from "./components/FooterBottom";
import { Header } from "./components/Header";


export const App = () => {
  return (
    <div className="App">
      <Header />
      <NavBar/>
      {/* <hr /> */}
      <Router/>
      <FooterBottom/>
    </div>
  )
};

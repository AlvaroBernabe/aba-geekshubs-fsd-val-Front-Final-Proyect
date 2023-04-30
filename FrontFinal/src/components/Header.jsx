import React from "react";
import logo from '../assets/images/logo2.png'

export const Header = () => {
  return (
    <>
      <div className="Header">
        <header>
          <div className="container">
            <div className="row">
              <div className="HeaderImg col-md-4 col-lg-4 col-xl-5 col-xxl-6 col-sm-11">
                <a href="/"><img src={logo} className="image-header" width="240" height="90" /></a>
              </div>
              <div className="textoHeader col-md-7 col-lg-7 col-xl-6 col-xxl-5 d-none d-md-block"><h3>Retro games, abandonware, freeware and classic games information archive</h3></div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}


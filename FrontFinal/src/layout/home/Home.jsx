import React from "react";
import "./Home.css";
import img1 from "../../assets/images/tarzanreview.png";
import img2 from "../../assets/images/commandos.png";
import img3 from "../../assets/images/contra.png";
import img4 from "../../assets/images/sidcivilization.png";
import img5 from "../../assets/images/doom.jpg";
import img6 from "../../assets/images/wolfStein3D.png";
import img7 from "../../assets/images/systemSchock.png";
import img8 from "../../assets/images/ultima.jpg";

export const Home = () => {
  return (
    <>
      <div className="container p-4">
        <h4>
          <b>Wellcome to my First Serious Proyect in life called GAMES&OLD</b>
        </h4>
        {/* <p style={{ backgroundColor: "lightblue" }}> */}
        <p>
          GAMES&OLD, is an abandonware games information archive for Amiga, Atari
          8-bit, Atari ST, Commodore C64, PC (DOS / Windows), Macintosh, SEGA
          Genesis / MegaDrive and ZX Spectrum. On our pages, we want to show you
          the old games we played in the 80's, 90's, and early 2000's. The games
          we are describing are no longer supported by the publishers. You will
          not buy them in stores anymore. The aim of our site is to keep old
          abandonware games information for future generations. Just browse our archive
          and feel free to review the games and add then to favourites.
        </p>
        <p>Have a look at the most popular retro games.</p>
        <p>
          You can also browse the games database or read the latest stories about
          the best titles or the most celebrated game designers of the past.
        </p>
        <p>
          <b>
            We respect the applicable copyright. All reported or unsuitable titles
            will be removed from our sites.
          </b>
        </p>
        <div className="row">
          <h3>LATEST REVIEWS</h3>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Tarzan</em> </h6></li>
              <li><img src={img1} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Commandos: Behind Enemy Lines</em> </h6></li>
              <li><img src={img2} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Contra</em> </h6></li>
              <li><img src={img3} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Sid Meier's Civilization II</em> </h6></li>
              <li><img src={img4} alt="" className="img-fluid" /></li>
            </ul>
          </div>
        </div>
        <p>You can find more in the News Section</p>
        <h3>LATEST GAMES ADDED</h3>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Doom</em> </h6></li>
              <li><img src={img5} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Wolfenstein 3D</em> </h6></li>
              <li><img src={img6} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>System Shock</em> </h6></li>
              <li><img src={img7} alt="" className="img-fluid" /></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><h6><em>Ultima</em> </h6></li>
              <li><img src={img8} alt="" className="img-fluid" /></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
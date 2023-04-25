import React from "react";
import {
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Steam,
} from "react-bootstrap-icons";

export const FooterBottom = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">QUICK LINKS</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-dark">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Privacy & Data Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Vulnerability Disclosure Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">
              Other Proyects{" "}
              <a className="text-black" href="https://github.com/AlvaroBernabe">
                <Github />
              </a>
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="http://github.com/AlvaroBernabe/aba-geekshubs-fsd-val-Projecto-Consola">
                  Proyect 1 - GameConsole
                </a>
              </li>
              <li>
                {" "}
                <a href="https://github.com/AlvaroBernabe/aba-geekshubs-fsd-val-Projecto2-Carta-Restauracion">
                  Proyect 2 - Menu Restaurant
                </a>
              </li>
              <li>
                {" "}
                <a href="https://github.com/AlvaroBernabe/aba-geekshubs-fsd-val-Projecto4---TicTacToe">
                  Proyect 3 - TicTacToe
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">
              Other Proyects{" "}
              <a className="text-black" href="https://github.com/AlvaroBernabe">
                <Github />
              </a>
            </h5>
            <ul className="list-unstyled mb-0">
              <li>
                {" "}
                <a href="https://github.com/AlvaroBernabe/Project04-DentalClinic">
                  Proyect 4 - Backend Dental Clinic
                </a>
              </li>
              <li>
                {" "}
                <a href="https://github.com/AlvaroBernabe/aba-geekshubs-fsd-val-Project5---DentalClinic-Front">
                  Proyect 5 - FrontEnd Dental Clinic
                </a>
              </li>
              <li>
                {" "}
                <a href="https://github.com/AlvaroBernabe/-aba-geekshubs-fsd-val-Project6---Laravel">
                  Proyect 6 - Backend Laravel Api (Discord)
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0  d-flex flex-column justify-content-start align-items-stretch">
            <h5 className="text-uppercase mb-0">You Can Find Me</h5>
            <ul className="list-unstyled mb-0 d-flex justify-content-between  align-items-stretch flex-row">
              <li>
                <a
                  className="text-black"
                  href="https://steamcommunity.com/id/alvarito101093/"
                >
                  <Steam />{" "}
                </a>
              </li>
              <li>
                <a
                  className="text-black"
                  href="https://github.com/AlvaroBernabe"
                >
                  <Github />
                </a>
              </li>
              <li>
                <a
                  className="text-black"
                  href="https://twitter.com/alvarito101093"
                >
                  <Twitter />
                </a>
              </li>
              <li>
                <a
                  className="text-black"
                  href="https://www.youtube.com/@TheAlvarito101093/videos"
                >
                  <Youtube />
                </a>
              </li>
              <li>
                <a
                  className="text-black"
                  href="https://www.linkedin.com/in/%C3%A1lvaro-bernab%C3%A9-alonso-6514a999/"
                >
                  <Linkedin />
                </a>
              </li>
            </ul>

            <div className="text-center">GAMES&OLD 2023</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

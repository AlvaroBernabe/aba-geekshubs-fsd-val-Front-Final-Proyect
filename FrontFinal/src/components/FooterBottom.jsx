import React from "react";
import {
  Instagram,
  Facebook,
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
             <a href="http://github.com/AlvaroBernabe/aba-geekshubs-fsd-val-Projecto-Consola">proyecto</a>


            </ul>
          </div>



          <div className="col-lg-3 col-md-6 mb-4 mb-md-0  d-flex flex-column justify-content-start align-items-stretch">
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

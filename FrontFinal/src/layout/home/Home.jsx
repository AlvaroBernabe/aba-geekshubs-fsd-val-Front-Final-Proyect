import React from "react";
import "./Home.css";
import img1 from "../../assets/images/tarzanreview.png";
import img2 from "../../assets/images/commandos.png";
import img3 from "../../assets/images/contra.png";
import img4 from "../../assets/images/sidcivilization.png";
import { Col, Container, Row } from "react-bootstrap";

export const Home = () => {
  return (
    <>
      <h4>
        <b>Wellcome to my First Serious Proyect in life called GAMES&OLD</b>
      </h4>
      <p style={{ backgroundColor: "lightblue" }}>
        GAMES&OLD, is an abandonware games information archive for Amiga, Atari
        8-bit, Atari ST, Commodore C64, PC (DOS / Windows), Macintosh, SEGA
        Genesis / MegaDrive and ZX Spectrum. On our pages, we want to show you
        the old games we played in the 80's, 90's, and early 2000's. The games
        we are describing are no longer supported by the publishers. You will
        not buy them in stores anymore. The aim of our site is to keep old
        abandonware games for future generations. All the games you can download
        and play on modern computers. On AbandonwareGames.net you will find best
        old games like: Civilization, Cannon Fodder, Lemmings, Quake, Doom,
        Railroad Tycoon, Duke Nukem and many, many more. Just browse our archive
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
      <Container fluid>
        <Row>
          <Col>
            <h3>Latest Games Reviewed:</h3>
            <h5> Tarzan</h5>
            <img src={img1} alt="" height={200} />
            <h5>Commandos: Behind Enemy Lines</h5>
            <img src={img2} alt="" height={200} />
            <h5>Contra</h5>
            <img src={img3} alt="" height={200} />
            <h5>Sid Meier's Civilization II</h5>
            <img src={img4} alt="" height={200} />
          </Col>
        </Row>
      </Container>
      <p>You can find more in the Reviews Section</p>
      <h3>Latest Games Added</h3>
      <p></p>
    </>
  );
};

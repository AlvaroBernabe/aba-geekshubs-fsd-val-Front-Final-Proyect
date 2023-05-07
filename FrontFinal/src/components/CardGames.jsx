import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UpdateGame } from "../layout/games/UpdateGame";
import { detailData } from "../layout/detailSlice";
import { gameDelete } from "../layout/services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../layout/userSlice";


function CardGames({ games }) {
  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const handleGamesUpdate = () => {
    setUpdate(false);
    // reloadGames();
  };

  const handleGamesDelete = () => {
    setRemove(false);
    // reloadGames();
  };

  const userRedux = useSelector(userData);

  const ReduxAppointment = useSelector(detailData);
  const [welcome, setWelcome] = useState("");

  let params = ReduxAppointment.choosenObject.id;

  const GamesDelete = async () => {
    gameDelete(params, userRedux.credentials.token)
      .then(() => {
        setWelcome(`Correctly Deleted Game`);
        setTimeout(() => {
          setRemove(false);
          setWelcome(``);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };


  return (
    <Card className="CardGames">
      <Card.Img className="imgtest" variant="top" src={games.game_image} />
      <Card.Body>
        <ul>
          <li>
            <span className="textColor"><b>Game ID: </b></span>
            {games.id}
          </li>
          <li>
            <span className="textColor"><b>Name: </b></span>
            {games.name}
          </li>
          <li>
            <span className="textColor"><b>Genre: </b></span>
            {games.genre}
          </li>
          <li>
            <span className="textColor"><b>Score: </b></span>
            {games.score}
          </li>
          <li>
            <span className="textColor"><b>Description: </b></span>
            {games.description}
          </li>
          <li>
            <span className="textColor"><b>Publisher: </b></span>
            {games.publisher}
          </li>
          <li>
            <span className="textColor"><b>Release Date: </b></span>
            {games.release_date}
          </li>
        </ul>
        <div className="ButtonModalGames">
          <Button variant="danger" onClick={handleShowRemove}>
            Delete Game
          </Button>

          <Modal show={remove} onHide={handleCloseRemove}>
            <Modal.Header closeButton>
              <Modal.Title>You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {welcome !== "" ? (
                  <div className="divWellcome">
                    <Card>
                      <Card.Header>{welcome}</Card.Header>
                    </Card>
                  </div>
                ) : (
                  <div className="botonModificar">
                    <Button variant="Light" onClick={GamesDelete}>
                      Delete Game Forever
                    </Button>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseRemove}>
                Nope
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="primary" onClick={handleShowUpdate}>
            Update Game
          </Button>

          <Modal show={update} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Update Game</Modal.Title>
            </Modal.Header>
            <Modal.Body><UpdateGame onCardUpdate={handleGamesUpdate}></UpdateGame></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardGames;

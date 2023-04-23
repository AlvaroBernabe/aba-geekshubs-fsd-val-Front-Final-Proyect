import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UpdateGame } from "../layout/games/UpdateGame";

function CardGames({ games }) {
  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);
//   const hola = "hola"

  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={games.game_image} />
      <Card.Body>
        <ul>
          <li>
            <span className="textColor">Game ID: </span>
            {games.id}
          </li>
          <li>
            <span className="textColor">Name: </span>
            {games.name}
          </li>
          <li>
            <span className="textColor">Genre: </span>
            {games.genre}
          </li>
          <li>
            <span className="textColor">Score: </span>
            {games.score}
          </li>
          <li>
            <span className="textColor">Description: </span>
            {games.description}
          </li>
          <li>
            <span className="textColor">Publisher: </span>
            {games.publisher}
          </li>
          <li>
            <span className="textColor">Release Date: </span>
            {games.release_date}
          </li>
        </ul>
        <Button variant="danger" onClick={handleShowRemove}>
          Delete Game
        </Button>
        <Modal show={remove} onHide={handleCloseRemove}>
          <Modal.Header closeButton>
            <Modal.Title>You Sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are You Sure of Deleting The Game</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseRemove}>
              Nope
            </Button>
            <Button variant="danger" onClick={handleCloseRemove}>
              Yes Delete Game
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
        <Modal.Body><UpdateGame></UpdateGame></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate }>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Card.Body>
    </Card>
  );
}

export default CardGames;

import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { isFavouriteReview } from "../layout/reviewSlice";
import { useDispatch } from "react-redux";

function CardGamesUser({ games }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [review, setReview] = useState({
    player_score: "",
    player_review: "",
    favourite: "",
    game_id: "",
    user_id: "",
  });

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);
  //   const hola = "hola"


  const [showFavouriteModal, setShowFavouriteModal] = useState(false);
  const [showHateModal, setShowHateModal] = useState(false);


  const handleFavouriteYesClick = (games) => {
    setReview((prevState) => ({
      ...prevState,
      favourite: "1"
    }));
    setShowFavouriteModal(false);
    dispatch(isFavouriteReview({ choosenReview: review.favourite }))
    console.log(review, "esto es review en teoria");
        setTimeout(() => {
          navigate('/review/new');
      }, 500);

  }

  // const handleHateYesClick = () => {
  //   setReview((prevState) => ({
  //     ...prevState,
  //     favourite: "0"
  //   }));
  //   setShowHateModal(false);
  //   navigate('/review/new');
  // }

console.log(review, "esto es review en teoria");

  return (
    <Card className="CardGames">
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

        <div className="ButtonModalGames">

          <Button variant="primary" onClick={handleShowRemove}>
            Favourite
          </Button>
          <Modal show={remove} onHide={handleCloseRemove}>
            <Modal.Header closeButton>
              <Modal.Title>You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="primary" onClick={() => handleFavouriteYesClick(games)} key={games.id}>
                Favourite
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseRemove}>
                Nope
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </Card.Body>
    </Card>
  );
}

export default CardGamesUser;

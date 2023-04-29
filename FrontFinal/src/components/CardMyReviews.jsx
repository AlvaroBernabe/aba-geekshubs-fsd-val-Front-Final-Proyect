import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { isFavouriteReview } from "../layout/reviewSlice";

function CardMyReviews({ appo }) {

  const dispatch = useDispatch();

  console.log(appo, "soy appo")
  const isFavorite = (favorite) => {
    return favorite ? "Yes" : "No";
  };


  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  // const updateReview = (games) => {
  //   dispatch(isFavouriteReview({ choosenReview: games }))
  //   // console.log(games, "esto es review en teoria");
  //   setTimeout(() => {
  //     navigate('/review/new');
  //   }, 500);



  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img variant="top" src={appo.game_image} />
        <ul>
          <li><span className="textColor">ID: </span>{appo.id}</li>
          <li><span className="textColor">Game ID: </span>{appo.game_id}</li>
          <li><span className="textColor">Favorite: </span> {isFavorite(appo.favourite)}</li>
          <li><span className="textColor">Your Review: </span>{appo.player_review}</li>
          <li><span className="textColor">Player Score: </span>{appo.player_score}</li>
        </ul>
        <div className="ButtonDivFavouriteGame">
          <Button variant="primary" onClick={handleShowUpdate}>
            Update Review
          </Button>
          <Modal show={update} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Update Review</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
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

export default CardMyReviews;

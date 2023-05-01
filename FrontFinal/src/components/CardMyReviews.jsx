import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UpdateReviewUser } from "../layout/Reviews/UpdateReviewUser";
import { detailData } from "../layout/detailSlice";
import { DeleteReviewsUser } from "./DeleteReviewsUser";

function CardMyReviews({ reviewUpdate }) {

  const dispatch = useDispatch();
//   const gameDataUpdate = useSelector(detailData);
// console.log(gameDataUpdate, "esto es detail data");

  console.log(reviewUpdate, "soy appo")
  const isFavorite = (favorite) => {
    return favorite ? "Yes" : "No";
  };


  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);



  return (
    <Card className="CardGamesReview" >
      <Card.Body>
        <Card.Img variant="top" src={reviewUpdate?.game_image} />
        <ul>
          <span className="gameTitle">{reviewUpdate?.game_title}</span>
          <li><span className="textColor"> Favorite: </span> {isFavorite(reviewUpdate?.favourite)}</li>
          <li><span className="textColor"> Your Review: </span>{reviewUpdate?.player_review}</li>
          <li><span className="textColor"> Your Score: </span>{reviewUpdate?.player_score}</li>
          <li><span className="textColor"> Score: </span>{reviewUpdate?.game_score}</li>
        </ul>
        <div className="ButtonDivFavouriteGame">
          <Button variant="info" onClick={handleShowUpdate}>
            Update Review
          </Button>
          <Modal show={update} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>{reviewUpdate?.game_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body><UpdateReviewUser /> </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={handleCloseUpdate}>
                Nope
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="danger" onClick={handleShowRemove}>
            Delete Review
          </Button>
          <Modal show={remove} onHide={handleCloseRemove}>
            <Modal.Header closeButton>
              <Modal.Title>You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body><DeleteReviewsUser></DeleteReviewsUser></Modal.Body>
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

export default CardMyReviews;

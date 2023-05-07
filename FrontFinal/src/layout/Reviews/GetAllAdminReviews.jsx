import React, { useEffect, useState } from "react";
import { getAllReviewsAdmin } from "../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { addChoosenReview } from "../reviewSlice";
import { DeleteReview } from "./DeleteReview";

export const GetAllAdminReviews = () => {

  const userRedux = useSelector(userData);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews.length === 0) {
      getAllReviewsAdmin(userRedux?.credentials?.token)
        .then((result) => {
          setReviews(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);

  const gameSelect = (review) => {
    dispatch(addChoosenReview({ choosenReview: review }));
  };

  const handleReviewDelete = () => {
    setRemove(false);
    getAllReviewsAdmin(userRedux?.credentials?.token)
    .then((result) => {
      setReviews(result.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const findReviews = reviews.filter((game) => {
    return game.game_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      game.Reviews.user_id.toString().toLowerCase().includes(searchUserId.toLowerCase());
  });

  return (
    <>
      <Container>
        <div className="search-bar">
          <input type="text" placeholder="Search by game name" onChange={(e) => setSearchTerm(e.target.value)} />
          <input type="text" placeholder="Search by user ID" onChange={(e) => setSearchUserId(e.target.value)} />
        </div>
        <div className="ejemplo2">
          {findReviews.map((game) => {
            return (
              <Col onClick={() => gameSelect(game)} key={game.Reviews.id}>
                <ListGroup className="CardAllReviews">
                  <ul>
                    <li><span className=""><b>ID: </b></span>{game.Reviews.id}</li>
                    <li><span className=""><b>Game Name:</b> </span>{game.game_name}</li>
                    <li><span className=""><b>Game ID: </b></span>{game.Reviews.game_id}</li>
                    <li><span className=""><b>User ID: </b></span>{game.Reviews.user_id}</li>
                    <li><span className=""><b>Favorito: </b></span>{game.Reviews.favourite}</li>
                    <li><span className=""><b>Review: </b></span>{game.Reviews.player_review}</li>
                    <li><span className=""><b>Player Score:</b> </span>{game.Reviews.player_score}</li>
                  </ul>
                  <div className="ButtonModalReviews">
                    <Button variant="danger" onClick={handleShowRemove}>
                      Delete Review
                    </Button>
                    <Modal show={remove} onHide={handleCloseRemove}>
                      <Modal.Header closeButton>
                        <Modal.Title>You Sure?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body><DeleteReview onReviewDelete={handleReviewDelete} /></Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseRemove}>
                          Nope
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </ListGroup>
              </Col>
            );
          })}
        </div>
      </Container>
    </>
  );
};

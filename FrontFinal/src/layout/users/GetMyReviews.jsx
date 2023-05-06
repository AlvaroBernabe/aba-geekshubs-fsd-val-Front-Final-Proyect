import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyReviews } from "../services/apiCalls";
import { userData } from "../userSlice";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { addChoosenReview } from "../reviewSlice";
import { UpdateReviewUser } from "../Reviews/UpdateReviewUser";
import { DeleteReviewsUser } from "../../components/DeleteReviewsUser";
import { Trash3Fill } from "react-bootstrap-icons";

export const GetAllMyReviews = () => {
  const ReduxUserData = useSelector(userData);
  // const ReduxReviewData = useSelector(reviewData);
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews.length === 0) {
      getMyReviews(ReduxUserData?.credentials?.token)
        .then((result) => {
          // console.log(result, "hola soy result");
          setReviews(result.data.data.Reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);
  console.log(reviews, "hola soy reviews");


  const selected = (ejemplo) => {
    // console.log(ejemplo, "esto es game en teoria");
    dispatch(addChoosenReview({ choosenReview: ejemplo }))
  }


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
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {reviews.map((gamesData) => {
            console.log(gamesData, "hola soy test");
            return (
              <Col onClick={() => selected(gamesData)} key={gamesData.id}>
                <Card className="CardGames"  >
                  <Card.Body>
                    <Card.Img variant="top" src={gamesData?.game_image} />
                    <ul>
                      <span className="gameTitle">{gamesData?.game_title}</span>
                      <li><span className="textColor"> Favorite: </span> {isFavorite(gamesData?.favourite)}</li>
                      <li><span className="textColor"> Your Review: </span>{gamesData?.player_review}</li>
                      <li><span className="textColor"> Your Score: </span>{gamesData?.player_score}</li>
                      <div className="buttonDeleteReviewModal">
                        <li><span className="textColor"> Score: </span>{gamesData?.game_score}</li>
                        <Button className="trashBin" onClick={handleShowRemove}>
                          <Trash3Fill />
                        </Button>
                      </div>
                    </ul>
                    <div className="ButtonDivFavouriteGame">
                      <Button variant="info" onClick={handleShowUpdate}>
                        Update Review
                      </Button>
                      <Modal show={update} onHide={handleCloseUpdate}>
                        <Modal.Header closeButton>
                          <Modal.Title>{gamesData?.game_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><UpdateReviewUser /> </Modal.Body>
                        <Modal.Footer>
                          <Button variant="info" onClick={handleCloseUpdate}>
                            Nope
                          </Button>
                        </Modal.Footer>
                      </Modal>

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
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
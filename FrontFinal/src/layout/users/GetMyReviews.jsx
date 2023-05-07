import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReviewsDeleteUser, getMyReviews } from "../services/apiCalls";
import { userData } from "../userSlice";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { addChoosenReview, reviewData } from "../reviewSlice";
import { UpdateReviewUser } from "../Reviews/UpdateReviewUser";
import { Trash3Fill } from "react-bootstrap-icons";

export const GetAllMyReviews = () => {
  const userRedux = useSelector(userData);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");
  const ReviewsData = useSelector(reviewData);

  let params = ReviewsData?.choosenReview?.id;
  let gameName = ReviewsData?.choosenReview?.game_title;

  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

  const handleReviewUpdate = () => {
    setUpdate(false);
    reloadReviews();
  };

  const handleReviewDelete = () => {
    setRemove(false);
    reloadReviews();
  };

  useEffect(() => {
    if (reviews.length === 0) {
      getMyReviews(userRedux?.credentials?.token)
        .then((result) => {
          setReviews(result.data.data.Reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);


  const reloadReviews = () => {
    getMyReviews(userRedux?.credentials?.token)
      .then((result) => {
        setReviews(result.data.data.Reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const selected = (ejemplo) => {
    dispatch(addChoosenReview({ choosenReview: ejemplo }))
  }

  const isFavorite = (favorite) => {
    return favorite ? "Yes" : "No";
  };

  const ReviewDelete = async () => {
    ReviewsDeleteUser(params, userRedux?.credentials?.token)
      .then(() => {
        setWelcome(`Correctly Deleted ${gameName} Review`);
        setTimeout(() => {
          handleReviewDelete();
          setWelcome(``)
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {reviews.map((gamesData) => {
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
                      <Modal className="modalReview" show={update} onHide={handleCloseUpdate}>
                        <Modal.Header closeButton>
                          <Modal.Title>{gamesData?.game_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><UpdateReviewUser onReviewUpdate={handleReviewUpdate} /> </Modal.Body>
                        <Modal.Footer>
                          <Button variant="info" onClick={handleCloseUpdate}>
                            Nope
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <Modal className="modalReview" show={remove} onHide={handleCloseRemove}>
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
                              <div className="buttonDeleteReviewUser">
                                <Button variant="warning " onClick={ReviewDelete}>
                                  Delete Review Forever
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
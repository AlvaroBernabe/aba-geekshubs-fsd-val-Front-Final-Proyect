import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getMyReviews, newReview } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { detailData } from "../detailSlice";

export const UpdateReviewUser = () => {

  const userRedux = useSelector(userData);
  const gameDataUpdate = useSelector(detailData);

  console.log(gameDataUpdate.choosenObject, "esto es gameDataUpdate en teoria");

  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");
  const [reviews, setReviews] = useState([]);

  const [review, setReview] = useState({
    player_score: gameDataUpdate.choosenObject.player_score,
    player_review: gameDataUpdate.choosenObject.player_review,
    favourite: gameDataUpdate.choosenObject.favourite,
    game_id: gameDataUpdate?.choosenObject?.game_id,
  });

  const [favouriteOptions, setFavouriteOptions] = useState([
    { value: "", label: "-- Choose an option --" },
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ]);

  const inputHandler = (e) => {
    setReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => {
    if (reviews.length === 0) {
      getMyReviews(userRedux?.credentials?.token)
        .then((result) => {
          // console.log(result, "hola soy result");
          setReviews(result?.data?.data?.Reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);
  // console.log(games, "soy GAmes");

  const updateReview = () => {
    newReview(review, userRedux?.credentials?.token)
      .then((resultado) => {
        // console.log(ReduxUserData.credentials.token);
        console.log(resultado);
        setReview(resultado?.data)
        setWelcome(`Review Updated Correctly`);
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      })
      .catch(error => {
        setReview(error.message);
      });
  }

  console.log(review, "hola es review Update");

  return (
    <>
      <div>
        {welcome !== "" ? (
          <div className="divWellcome">
            <Card>
              <Card.Header>{welcome}</Card.Header>
            </Card>
          </div>
        ) : (
          <div>
            <Container>
              <Row className="updateReviewModal">
                <Col>
                  <Form>
                    <Form.Label>Score: {review?.player_score}</Form.Label>
                    <Form.Range
                      min={0}
                      max={10}
                      step={0.05}
                      name={"player_score"}
                      onChange={(e) => inputHandler(e)}
                    />
                    <Form.Group>
                      <Form.Label>Enter Your Review:</Form.Label>
                      <Form.Control
                        className={"inputLogin"}
                        as={"textarea"}
                        rows={3}
                        name={"player_review"}
                        maxLength={300}
                        placeholder={gameDataUpdate.choosenObject.player_review}
                        value={review?.player_review}
                        onChange={inputHandler}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Is Favourite?</Form.Label>
                      <Form.Select
                        className={"inputLogin"}
                        name={"favourite"}
                        value={review?.favourite}
                        onChange={inputHandler}
                      >
                        {favouriteOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <div className='botonNewReview'>
                      <Button
                        className="botonLog"
                        variant="primary"
                        onClick={() => updateReview()}
                      >
                        Update Review
                      </Button></div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGamesWithoutReviewUser, newReview } from "../services/apiCalls";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { reviewData } from "../reviewSlice";

export const NewReview = () => {
  //REDUX USER DATA && REVIEW DATA
  const userRedux = useSelector(userData);
  const gameId = useSelector(reviewData);
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");
  const [games, setGames] = useState([]);

  const [review, setReview] = useState({
    player_score: "",
    player_review: "",
    favourite: "",
    game_id: gameId?.choosenReview?.id,
    user_id: userRedux?.credentials?.usuario?.id,
  });

  //CONST IS FAVOURITE CHANGE 1 TO YES FOR VISIVILITY
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

  const checkError = (e) => {
  }

  useEffect(() => {
    if (gameId?.choosenReview?.id === "") {
      setReview((prevState) => ({
        ...prevState,
        game_id: gameId.choosenReview.id,
      }));
    }
  }, [review])

  //GET ALL GAMES WITHOUT REVIEW FOR THE SELECT
  useEffect(() => {
    if (games.length === 0) {
      getAllGamesWithoutReviewUser(userRedux?.credentials?.token)
        .then(
          result => {
            const sortedGames = result?.data?.data?.sort((a, b) => a.name.localeCompare(b.name));
            setGames(sortedGames)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

  //CONST NEW REVIEW AND REDIRECT TO GetMyFavourites.jsx
  const reviewNew = () => {
    newReview(review, userRedux?.credentials?.token)
      .then((resultado) => {
        setReview(resultado?.data)
        setWelcome(`Review Created Correctly`);
        setTimeout(() => {
          navigate('/games/favourites');
        }, 1500);
      })
      .catch(error => {
        setReview(error.message);
      });
  }

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
              <Row className="NewReview">
                <Col lg={6}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Game:</Form.Label>
                      <Form.Select
                        name="game_id"
                        value={review?.game_id}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                      >
                        <option value="">-- Select a game --</option>
                        {games.map((game) => (
                          <option key={game.id} value={game.id}>
                            {game.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
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
                        placeholder={"Enter Review"}
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
                        onClick={() => reviewNew()}
                      >
                        {" "}
                        New Review
                      </Button>
                    </div>
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

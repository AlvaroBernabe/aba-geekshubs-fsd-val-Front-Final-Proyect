import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
// import { reviewData } from "../reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyFavourites } from "../services/apiCalls";
import { Card, Col, Container, Row } from "react-bootstrap";
import CardMyReviews from "../../components/CardMyReviews";

export const GetMyFavourites = () => {

  const ReduxUserData = useSelector(userData);
  // const ReduxReviewData = useSelector(reviewData);
  const [favourites, setFavourites] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (favourites.length === 0) {
      getMyFavourites(ReduxUserData?.credentials?.token)
        .then((result) => {
          console.log(result, "esto es result");
          setFavourites(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [favourites]);
  console.log(favourites, "esto son favourites");


  const gameSelect = (favourite) => {
    console.log(favourite)
    // dispatch(addChoosenAppointment({ choosenAppointment: favourite }));
    // setTimeout(() => {
    //   navigate("/appointment/update");
    // }, 1000);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {favourites.map((game) => {
            return (
              <Col onClick={() => gameSelect(game)} key={game.id}>
                <Card className="CardGamesReview" >
                  <Card.Body>
                    <Card.Img variant="top" src={game?.game_image} />
                    <ul>
                      <span className="gameTitle">{game?.game_title}</span>
                      <li><span className="textColor"> Your Review: </span>{game?.player_review}</li>
                      <li><span className="textColor"> Your Score: </span>{game?.player_score}</li>
                      <li><span className="textColor"> Score: </span>{game?.game_score}</li>
                    </ul>
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
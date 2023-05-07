import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { getMyFavourites } from "../services/apiCalls";
import { Card, Col, Container, Row } from "react-bootstrap";

export const GetMyFavourites = () => {

  const userRedux = useSelector(userData);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (favourites.length === 0) {
      getMyFavourites(userRedux?.credentials?.token)
        .then((result) => {
          setFavourites(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [favourites]);

  return (
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {favourites.map((game) => {
            return (
              <Col key={game.id}>
                <Card className="CardGames" >
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
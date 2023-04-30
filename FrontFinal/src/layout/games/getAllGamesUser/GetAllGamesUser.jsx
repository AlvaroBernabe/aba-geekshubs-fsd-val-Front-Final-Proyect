import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userData } from "../../userSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { addChoosen } from "../../detailSlice";
import { getAllGamesWithoutReviewUser } from "../../services/apiCalls";
import { isFavouriteReview } from "../../reviewSlice";

export const GetAllGamesUser = () => {

  const [games, setGames] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("console log de users", users)      // Este saca los el array con los usuarios
    if (games.length === 0) {
      getAllGamesWithoutReviewUser(ReduxCredentials.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
            console.log(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

  const selected = (juego) => {
    dispatch(addChoosen({ choosenObject: juego }))
    console.log(juego)
    // setTimeout(() => {
    //     navigate("/users/all/details");
    //   }, 500);
  }

  function getStarScore(score) {
    // console.log(score)
    const maxScore = 10.00;
    const fullStars = "⭐️".repeat(Math.floor(score));
    const halfStar = score % 1 >= 0.5 ? "✮" : "";
    const emptyStars = "✰".repeat(Math.floor(maxScore - score));
    return `${fullStars}${halfStar}${emptyStars}`;
  }
  
  const scoreStar = getStarScore(games.score);
  

  const handleFavouriteYesClick = (games) => {
    dispatch(isFavouriteReview({ choosenReview: games }))
    console.log(games, "esto es review en teoria");
    setTimeout(() => {
      navigate('/review/new');
    }, 500);
  }

  return (
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {games.map((game) => {
            console.log(game, "hola soy game");
            return (
              <Col onClick={() => selected(game)} key={game.id}>
                <Card className="CardGames">
                  <Card.Img variant="top" src={game.game_image} />
                  <Card.Body>
                    <ul>
                      <span className="gameTitle">{game.name}</span>
                      <li>
                        <span className="textColor">Genre: </span>
                        {game.genre}
                      </li>
                      <li>
                        <span className="textColor">Score: </span>
                        {game.score} {scoreStar}
                      </li>
                      <li>
                        <span className="textColor">Description: </span>
                        {game.description}
                      </li>
                      <li>
                        <span className="textColor">Publisher: </span>
                        {game.publisher}
                      </li>
                      <li>
                        <span className="textColor">Release Date: </span>
                        {game.release_date}
                      </li>
                    </ul>
                    <div className="ButtonDivFavouriteGame">
                      <Button className="buttonFavorite" onClick={() => handleFavouriteYesClick(game)} key={game.id}>
                        Favourite?
                      </Button>
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
}

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { getAllGamesNonUser } from "../services/apiCalls";


export const GetAllGamesDefault = () => {
  const [games, setGames] = useState([]);

  //MESSAGE FOR BUTTON
  const renderTooltip = (props) => (
    <Tooltip id="ButtonRegister-tooltip" {...props}>
      You Need To Login First
    </Tooltip>
  )

  //GET ALL GAMES
  useEffect(() => {
    if (games.length === 0) {
      getAllGamesNonUser()
        .then(
          result => {
            setGames(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

  return (
    <>
      <Container fluid>
        <Row>
          {games.map((game) => {
            return (
              <Col className="ContainerAllGamesAdmin" onClick={() => selected(game)} key={game.id}>
                <Card className="CardGames">
                  <Card.Img variant="top" src={game.game_image} />
                  <Card.Body>
                    <ul>
                      <span className="gameTitle"><b>{game.name}</b></span>
                      <li>
                        <span className="textColor">Genre: </span>
                        {game.genre}
                      </li>
                      <li>
                        <span className="textColor">Score: </span>
                        {game.score}
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
                    <div className="ButtonDivNonUserFavouriteGame">
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 300 }}
                        overlay={renderTooltip}
                      >
                        <Button className="buttonFavoriteFalse" onClick={() => handleFavouriteYesClick(games)} key={games.id}>
                          Favourite?
                        </Button>
                      </OverlayTrigger>
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

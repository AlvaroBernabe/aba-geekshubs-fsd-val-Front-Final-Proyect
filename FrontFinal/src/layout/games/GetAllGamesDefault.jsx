import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { getAllGamesNonUser } from "../services/apiCalls";
import CardGamesUser from "../../components/CardGamesUser";

export const GetAllGamesDefault = () => {

    const [games, setGames] = useState([]);
    //   const navigate = useNavigate();
    const renderTooltip = (props) => (
        <Tooltip id="ButtonRegister-tooltip" {...props}>
            You Need To Login First
        </Tooltip>
    )

    useEffect(() => {
        if (games.length === 0) {
            getAllGamesNonUser()
                .then(
                    result => {
                        setGames(result.data.data)
                        console.log(result.data.data)
                    }
                )
                .catch(error => console.log(error));
        }
    }, [games])
    console.log(games);

    return (
        <>
            <Container fluid>
                <Row>
                    {games.map((game) => {
                        console.log(game, "hola soy game");
                        return (
                            <Col className="ContainerAllGamesAdmin" onClick={() => selected(game)} key={game.id}>
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

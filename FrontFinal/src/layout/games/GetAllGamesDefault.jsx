import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getAllGamesNonUser } from "../services/apiCalls";
import CardGamesUser from "../../components/CardGamesUser";

export const GetAllGamesDefault = () => {

    const [games, setGames] = useState([]);
    //   const navigate = useNavigate();

    useEffect(() => {
        // console.log("console log de users", users)      // Este saca los el array con los usuarios
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

    const selected = (juego) => {
        // setTimeout(() => {
        //     navigate("/login");
        //   }, 1500);
    }

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
                                            <Button className="buttonFavoriteFalse" onClick={() => handleFavouriteYesClick(games)} key={games.id}>
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

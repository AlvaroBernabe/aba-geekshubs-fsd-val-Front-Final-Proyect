import React from "react";
import { Button, Card } from "react-bootstrap";

function CardGames({ appo }) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title >
                    {appo.game_image}
                </Card.Title>
                <ul>
                <li><span className="textColor">Game ID: </span>{appo.id}</li>
                    <li><span className="textColor">Name: </span>{appo.name}</li>
                    <li><span className="textColor">Genre: </span>{appo.genre}</li>
                    <li><span className="textColor">Score: </span>{appo.score}</li>
                    <li><span className="textColor">Description: </span>{appo.description}</li>
                    <li><span className="textColor">Publisher: </span>{appo.publisher}</li>
                    <li><span className="textColor">Release Date: </span>{appo.release_date}</li>
                </ul>
                <Button></Button>
            </Card.Body>
        </Card>
    );
}

export default CardGames;

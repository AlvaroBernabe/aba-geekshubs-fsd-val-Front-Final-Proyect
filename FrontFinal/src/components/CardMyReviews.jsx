import React from "react";
import { Button, Card } from "react-bootstrap";

function CardMyReviews({ appo }) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                {/* <Card.Title >
                    {appo.game_image}
                </Card.Title> */}
                <ul>
                    <li><span className="textColor">ID: </span>{appo.id}</li>
                    <li><span className="textColor">Game ID: </span>{appo.game_id}</li>
                    <li><span className="textColor">Favorito: </span>{appo.favourite}</li>
                    <li><span className="textColor">Your Review: </span>{appo.player_review}</li>
                    <li><span className="textColor">Player Score: </span>{appo.player_score}</li>
                </ul>
                <Button></Button>
            </Card.Body>
        </Card>
    );
}

export default CardMyReviews;

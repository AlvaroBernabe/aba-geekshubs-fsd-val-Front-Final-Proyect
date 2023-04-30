import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function CardAllReviews({ appo }) {
    return (
        <ListGroup className="CardAllReviews">
        {/* <Card style={{ width: "18rem" }}>
            <Card.Body> */}
                {/* <Card.Title >
                    {appo.game_image}
                </Card.Title> */}
                <ul>
                    <li><span className="textColor">ID: </span>{appo.Reviews.id}</li>
                    <li><span className="textColor">Game Name: </span>{appo.game_name}</li>
                    <li><span className="textColor">Game ID: </span>{appo.Reviews.game_id}</li>
                    <li><span className="textColor">Favorito: </span>{appo.Reviews.favourite}</li>
                    <li><span className="textColor">Review: </span>{appo.Reviews.player_review}</li>
                    <li><span className="textColor">Player Score: </span>{appo.Reviews.player_score}</li>
                </ul>
            {/* </Card.Body>
        </Card> */}
        </ListGroup>
    );
}

export default CardAllReviews;

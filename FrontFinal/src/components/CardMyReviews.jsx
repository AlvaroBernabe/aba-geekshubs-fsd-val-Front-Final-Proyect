import React, { useState } from "react";
import { Card } from "react-bootstrap";

function CardMyReviews({ appo }) {
    console.log(appo, "soy appo")
    const isFavorite = (favorite) => {
        return favorite ? "Yes" : "No";
      };
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Img variant="top" src={appo.game_image} />
                <ul>
                    <li><span className="textColor">ID: </span>{appo.id}</li>
                    <li><span className="textColor">Game ID: </span>{appo.game_id}</li>
                    <li><span className="textColor">Favorite: </span> {isFavorite(appo.favourite)}</li>
                    <li><span className="textColor">Your Review: </span>{appo.player_review}</li>
                    <li><span className="textColor">Player Score: </span>{appo.player_score}</li>
                </ul>
            </Card.Body>
        </Card>
    );
}

export default CardMyReviews;

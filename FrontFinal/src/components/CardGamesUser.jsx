import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isFavouriteReview } from "../layout/reviewSlice";
import { useDispatch } from "react-redux";

function CardGamesUser({ games }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getStarScore(score) {
    // console.log(score)
    const maxScore = 10.00;
    const fullStars = "⭐️".repeat(Math.floor(score));
    const halfStar = score % 1 >= 0.5 ? "✮" : "";
    const emptyStars = "✰".repeat(Math.floor(maxScore - score));
    return `${fullStars}${halfStar}${emptyStars}`;
  }
  
  const scoreStar = getStarScore(games.score);
  
  console.log("esto es score", scoreStar);



  const handleFavouriteYesClick = (games) => {
    dispatch(isFavouriteReview({ choosenReview: games }))
    console.log(games, "esto es review en teoria");
    setTimeout(() => {
      navigate('/review/new');
    }, 500);
  }

  return (
    <Card className="CardGames">
      <Card.Img variant="top" src={games.game_image} />
      <Card.Body>
        <ul>
          <span className="gameTitle">{games.name}</span>
          <li>
            <span className="textColor">Genre: </span>
            {games.genre}
          </li>
          <li>
            <span className="textColor">Score: </span>
            {games.score} {scoreStar}
          </li>
          <li>
            <span className="textColor">Description: </span>
            {games.description}
          </li>
          <li>
            <span className="textColor">Publisher: </span>
            {games.publisher}
          </li>
          <li>
            <span className="textColor">Release Date: </span>
            {games.release_date}
          </li>
        </ul>
        <div className="ButtonDivFavouriteGame">
          <Button className="buttonFavorite" onClick={() => handleFavouriteYesClick(games)} key={games.id}>
            Favourite?
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardGamesUser;

import React, { useEffect, useState } from "react";
import { getAllReviewsAdmin } from "../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { addChoosenReview } from "../reviewSlice";

export const GetAllAdminReviews = () => {
  const ReduxUserData = useSelector(userData);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews.length === 0) {
      getAllReviewsAdmin(ReduxUserData?.credentials?.token)
        .then((result) => {
          console.log(result);
          setReviews(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);
  console.log(reviews);

  const gameSelect = (review) => {
    console.log(review.Reviews.id)
    dispatch(addChoosenReview({ choosenReview: review }));
    // setTimeout(() => {
    //   navigate("/appointment/update");
    // }, 1000);
  };

  const findReviews = reviews.filter((game) => {
    return game.game_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      game.Reviews.user_id.toString().toLowerCase().includes(searchUserId.toLowerCase());
  });

  return (
    <>
      <Container>
        <div className="search-bar">
          <input type="text" placeholder="Search by game name" onChange={(e) => setSearchTerm(e.target.value)} />
          <input type="text" placeholder="Search by user ID" onChange={(e) => setSearchUserId(e.target.value)} />
        </div>
        <div className="ejemplo2">
          {findReviews.map((game) => {
            return (
              <Col onClick={() => gameSelect(game)} key={game.Reviews.id}>
                <ListGroup className="CardAllReviews">
                  <ul>
                    <li><span className="textColor">ID: </span>{game.Reviews.id}</li>
                    <li><span className="textColor">Game Name: </span>{game.game_name}</li>
                    <li><span className="textColor">Game ID: </span>{game.Reviews.game_id}</li>
                    <li><span className="textColor">User ID: </span>{game.Reviews.user_id}</li>
                    <li><span className="textColor">Favorito: </span>{game.Reviews.favourite}</li>
                    <li><span className="textColor">Review: </span>{game.Reviews.player_review}</li>
                    <li><span className="textColor">Player Score: </span>{game.Reviews.player_score}</li>
                  </ul>
                </ListGroup>
              </Col>
            );
          })}
        </div>
      </Container>
    </>
  );
};

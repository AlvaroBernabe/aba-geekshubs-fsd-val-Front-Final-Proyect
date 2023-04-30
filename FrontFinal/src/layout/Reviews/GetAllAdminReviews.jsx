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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchName, setSearchName] = useState('');



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

    const filterReviewGameName = reviews.filter((game) => {
        return game.game_name.toLowerCase().includes(searchName.toLowerCase());
    });

    return (
        <>
            <Container>
                <div className="search-bar">
                    <input type="text" placeholder="Search By Game Name" onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div className="ejemplo2">
                    {filterReviewGameName.map((game) => {
                        return (
                            <Col onClick={() => gameSelect(game)} key={game.Reviews.id}>
                                <ListGroup className="CardAllReviews">
                                    <ul>
                                        <li><span className="textColor">ID: </span>{game.Reviews.id}</li>
                                        <li><span className="textColor">Game Name: </span>{game.game_name}</li>
                                        <li><span className="textColor">Game ID: </span>{game.Reviews.game_id}</li>
                                        <li><span className="textColor">Favorito: </span>{game.Reviews.favourite}</li>
                                        <li><span className="textColor">Review: </span>{game.Reviews.player_review}</li>
                                        <li><span className="textColor">Player Score: </span>{game.Reviews.player_score}</li>
                                        <li><span className="textColor">Player Id: </span>{game.Reviews.user_id}</li>
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

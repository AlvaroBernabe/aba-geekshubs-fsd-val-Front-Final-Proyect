import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
// import { reviewData } from "../reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyFavourites } from "../services/apiCalls";
import NavBar from "../../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import CardReviews from "../../components/CardReviews";

export const GetMyFavourites = () => {
    
    const ReduxUserData = useSelector(userData);
    // const ReduxReviewData = useSelector(reviewData);
    const [favourites, setFavourites] = useState([]);
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
        if (favourites.length === 0) {
            getMyFavourites(ReduxUserData?.credentials?.token)
                .then((result) => {
                    console.log(result);
                    setFavourites(result.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [favourites]);
    console.log(favourites);


    const gameSelect = (favourite) => {
        console.log(favourite)
        // dispatch(addChoosenAppointment({ choosenAppointment: favourite }));
        // setTimeout(() => {
        //   navigate("/appointment/update");
        // }, 1000);
    };

    return (
        <>
            <NavBar />
            <hr />
            <Container fluid>
                <Row>
                    {favourites.map((game) => {
                        return (
                            <Col onClick={() => gameSelect(game)} key={game.id}>
                                <CardReviews appo={game} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};
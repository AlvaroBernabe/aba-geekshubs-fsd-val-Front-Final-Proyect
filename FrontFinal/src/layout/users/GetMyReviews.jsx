import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyReviews } from "../services/apiCalls";
import { userData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import CardMyReviews from "../../components/CardMyReviews";
import { detailGame } from "../detailSlice";

export const GetAllMyReviews = () => {
  const ReduxUserData = useSelector(userData);
  // const ReduxReviewData = useSelector(reviewData);
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews.length === 0) {
      getMyReviews(ReduxUserData?.credentials?.token)
        .then((result) => {
          // console.log(result, "hola soy result");
          setReviews(result.data.data.Reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);
  console.log(reviews, "hola soy reviews");


  const gameSelect = (review) => {
    console.log(review)
    dispatch(detailGame({ choosenObject: review }));
    // setTimeout(() => {
    //   navigate("/appointment/update");
    // }, 1000);
  };

  return (
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {reviews.map((gamesData) => {
                        console.log(gamesData, "hola soy test");
            return (
              <Col onClick={() => gameSelect(gamesData)} key={gamesData.id}>
                <CardMyReviews reviewUpdate={gamesData} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyReviews } from "../services/apiCalls";
import { userData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import CardMyReviews from "../../components/CardMyReviews";
import { detailGame } from "../detailSlice";
import { addChoosenReview } from "../reviewSlice";

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


  const selected = (ejemplo) => {
    // console.log(ejemplo, "esto es game en teoria");
    dispatch(addChoosenReview({ choosenReview: ejemplo }))
}

  return (
    <>
      <Container fluid>
        <Row className="bodyGetFavourites">
          {reviews.map((gamesData) => {
            console.log(gamesData, "hola soy test");
            return (
              <Col onClick={() => selected(gamesData)} key={gamesData.id}>
                <CardMyReviews reviewUpdate={gamesData} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
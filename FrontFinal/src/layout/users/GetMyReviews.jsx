import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyReviews } from "../services/apiCalls";
import { userData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import CardMyReviews from "../../components/CardMyReviews";

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
          console.log(result);
          setReviews(result.data.data.Reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [reviews]);
  console.log(reviews);


  const gameSelect = (review) => {
    console.log(review)
    // dispatch(addChoosenAppointment({ choosenAppointment: favourite }));
    // setTimeout(() => {
    //   navigate("/appointment/update");
    // }, 1000);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {reviews.map((game) => {
            return (
              <Col onClick={() => gameSelect(game)} key={game.id}>
                <CardMyReviews appo={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
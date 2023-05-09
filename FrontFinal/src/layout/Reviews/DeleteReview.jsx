import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { userData } from "../userSlice";
import { reviewData } from "../reviewSlice";
import { ReviewsDeleteAdmin } from "../services/apiCalls";

export const DeleteReview = ({ onReviewDelete }) => {
  //REDUX USER DATA && REVIEW DETAILS
  const userRedux = useSelector(userData);
  const ReviewsData = useSelector(reviewData);
  const [welcome, setWelcome] = useState("");
  let params = ReviewsData?.choosenReview?.Reviews.id;

  //CONST DELETE REVIEWS AND RELOAD ALL REVIEWS
  const ReviewDelete = async () => {
    ReviewsDeleteAdmin(params, userRedux?.credentials?.token)
      .then(() => {
        setWelcome(`Correctly Deleted Review ID: ${params}`);
        setTimeout(() => {
          onReviewDelete();
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="modalReview">
        {welcome !== "" ? (
          <div className="divWellcome">
            <Card>
              <Card.Header>{welcome}</Card.Header>
            </Card>
          </div>
        ) : (
          <div className="botonModificar">
            <Button variant="Light" onClick={ReviewDelete}>
              Delete User Forever
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

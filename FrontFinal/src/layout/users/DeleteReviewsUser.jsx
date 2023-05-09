import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { reviewData } from "../reviewSlice";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReviewsDeleteUser } from "../services/apiCalls";

export const DeleteReviewsUser = ({ onReviewDelete }) => {
  //REDUX USER DATA && REVIEWS DATA
  const userRedux = useSelector(userData);
  const reviewsData = useSelector(reviewData);
  const [welcome, setWelcome] = useState("");

  let params = reviewsData?.choosenReview?.id;
  let gameName = reviewsData?.choosenReview?.game_title;

  //CONST DELETE REVIEWS AND RELOAD LIST OF REVIEWS
  const ReviewDelete = async () => {
    ReviewsDeleteUser(params, userRedux?.credentials?.token)
      .then(() => {
        setWelcome(`Correctly Deleted ${gameName} Review`);
        setTimeout(() => {
          onReviewDelete();
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        {welcome !== "" ? (
          <div className="divWellcome">
            <Card>
              <Card.Header>{welcome}</Card.Header>
            </Card>
          </div>
        ) : (
          <div className="buttonDeleteReviewUser">
            <Button variant="warning " onClick={ReviewDelete}>
              Delete Review Forever
            </Button>
          </div>
        )}
      </div>
    </>
  );
}


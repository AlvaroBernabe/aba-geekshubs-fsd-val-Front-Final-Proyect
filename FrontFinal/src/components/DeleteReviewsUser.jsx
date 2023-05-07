import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { reviewData } from "../layout/reviewSlice";
import { userData } from "../layout/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReviewsDeleteUser } from "../layout/services/apiCalls";

export const DeleteReviewsUser = () => {
  const ReduxCredentials = useSelector(userData);
  const ReviewsData = useSelector(reviewData);
  const [welcome, setWelcome] = useState("");

  let params = ReviewsData?.choosenReview?.id;
  let gameName = ReviewsData?.choosenReview?.game_title;




  const ReviewDelete = async () => {
    ReviewsDeleteUser(params, ReduxCredentials?.credentials?.token)
      .then(() => {
        setWelcome(`Correctly Deleted ${gameName} Review`);
        setTimeout(() => {
          window.location.reload(true);
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


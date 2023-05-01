import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { reviewData } from "../reviewSlice";
import { useNavigate } from "react-router-dom";
import { ReviewsDeleteAdmin } from "../services/apiCalls";
import { Button, Card } from "react-bootstrap";

export const DeleteReview = () => {
    const ReduxCredentials = useSelector(userData);
    const ReviewsData = useSelector(reviewData);
    const [welcome, setWelcome] = useState("");
    const navigate = useNavigate();

    let params = ReviewsData?.choosenReview?.Reviews.id;
    console.log(ReviewsData);

    const [user, setUser] = useState({
        id: params,
    });

    const ReviewDelete = async () => {
        ReviewsDeleteAdmin(params, ReduxCredentials?.credentials?.token)
            .then(() => {
                setWelcome(`Correctly Deleted Review ID: ${params}`);
                setTimeout(() => {
                    window.location.reload(true);
                  }, 1500);
            })
            .catch((error) => console.log(error));
    };
    // console.log(ReduxAppointment.choosenObject.email, "esto deberia ser id de user a borrar");
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

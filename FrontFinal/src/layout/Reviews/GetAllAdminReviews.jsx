import React, { useEffect, useState } from "react";
import { getAllReviewsAdmin } from "../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { Col, Container, Form, Row } from "react-bootstrap";
import { addChoosenReview } from "../reviewSlice";
import CardAllReviews from "../../components/CardAllReviews";

export const GetAllAdminReviews = () => {
    const ReduxUserData = useSelector(userData);
    const [reviews, setReviews] = useState([]);
    
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

    return (
        <>
            <Container>
                {/* <Row> */}
                <div className="ejemplo2">
                    {reviews.map((game) => {
                        return (
                            <Col  onClick={() => gameSelect(game)} key={game.Reviews.id}>
                                <CardAllReviews  appo={game} />
                            </Col>
                        );
                    })}
                {/* </Row> */}</div>
            </Container>
        </>
    );
};

    //Mapeo en forma de select del game.name

// return (
//     <>
//       <Container fluid>
//         <Form.Select  onClick={gameSelect}>
//             {reviews.map(game =>
//             <option key={game.Reviews.id} value={game.Reviews.id}>{game.game_name}</option>
//             )};
//         </Form.Select >
//       </Container>
//     </>
//   );
// };

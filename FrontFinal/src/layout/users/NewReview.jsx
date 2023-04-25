import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { newReview } from "../services/apiCalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";

export const NewReview = () => {

  const ReduxUserData = useSelector(userData);
  // console.log( ReduxUserData.credentials.usuario.id, "esto es id en teoria");

  const navigate = useNavigate();

  const [review, setReview] = useState({
    player_score: "",
    player_review: "",
    favourite: "",
    game_id: "",
    user_id: ReduxUserData.credentials.usuario.id,
  });

  const inputHandler = (e) => {
    setReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [valireview, setValireview] = useState({
    player_scoreVali: true,
    player_reviewVali: true,
    phone_numberVali: true,
    favouriteVali: true,
  });

  const [reviewError, setReviewError] = useState({
    player_scoreError: "",
    player_reviewError: "",
    phone_numberError: "",
    favouriteError: "",
  });

  const [registerAct, setRegisterAct] = useState(false);
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    for (let error in reviewError) {
      if (reviewError[error] != "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let empty in review) {
      if (review[empty] === "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let validated in valireview) {
      if (valireview[validated] === false) {
        setRegisterAct(false);
        return;
      }
    }
    setRegisterAct(true);
  });

  const checkError = (e) => {
  }


  const reviewNew = () => {
    newReview(review, ReduxUserData.credentials.token)
      .then((resultado) => {
        setReview(resultado.data)
        // setWelcome(`Cita creada correctamente para el día: ${appointments.date}`);
        // setTimeout(()=>{
        //     navigate('/user/myprofile');
        // },3500);
      })
      .catch(error => {
        setReview(error.message);
      });
  }

  console.log(review, "hola soy review");
  // console.log(valiuser, "hola soy vali user");

  return (
    <>
      <div className="divPrincipal">
        <div className="loginDesign">
          {welcome !== "" ? (
            <div>{welcome}</div>
          ) : (
            <div>
              <Container>
                <Row className="LoginForm">
                  <Col lg={6}>
                    <Form>
                      <Form.Group>
                        <Form.Label>
                          Enter your player_score:
                        </Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"float"}
                          name={"player_score"}
                          maxLength={70}
                          placeholder={"Player Score"}
                          changeFunction={(e) =>
                            inputHandler(e)
                          }
                          blurFunction={(e) =>
                            checkError(e)
                          }
                        />
                      </Form.Group>
                      {/* <div>{reviewError.nameError}</div> */}
                      <Form.Group>
                        <Form.Label>
                          Enter your player_review:
                        </Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"text"}
                          name={"player_review"}
                          maxLength={70}
                          placeholder={review.surname}
                          changeFunction={(e) =>
                            inputHandler(e)
                          }
                          blurFunction={(e) =>
                            checkError(e)
                          }
                        />
                      </Form.Group>
                      {/* <div>{reviewError.surnameError}</div> */}
                      <Form.Group>
                        <Form.Label>
                          Enter your favourite:
                        </Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"boolean"}
                          name={"favourite"}
                          maxLength={70}
                          placeholder={"Favorito?"}
                          changeFunction={(e) =>
                            inputHandler(e)
                          }
                          blurFunction={(e) =>
                            checkError(e)
                          }
                        />
                      </Form.Group>
                      {/* <div>{reviewError.phone_numberError}</div> */}
                      <Form.Group>
                        <Form.Label>
                          Enter the game_id:
                        </Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"integer"}
                          name={"game_id"}
                          maxLength={70}
                          placeholder={"Introduce el Juego"}
                          changeFunction={(e) =>
                            inputHandler(e)
                          }
                          blurFunction={(e) =>
                            checkError(e)
                          }
                        />
                      </Form.Group>
                      {/* <div>{reviewError.directionError}</div> */}
                      <br />
                      <Button
                        className="botonLog"
                        variant="primary"
                        onClick={() => reviewNew()}
                      >
                        {" "}
                        New Review
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

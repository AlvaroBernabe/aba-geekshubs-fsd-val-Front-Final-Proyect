import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { getAllGamesWithoutReviewUser, newReview } from "../services/apiCalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";

export const NewReview = () => {

  const ReduxUserData = useSelector(userData);
  // console.log( ReduxUserData.credentials.usuario.id, "esto es id en teoria");

  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  const [review, setReview] = useState({
    player_score: "",
    player_review: "",
    favourite: "",
    game_id: "",
    user_id: ReduxUserData.credentials.usuario.id,
  });

  const [favouriteOptions, setFavouriteOptions] = useState([
    { value: "", label: "-- Choose an option --" },
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ]);

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

  useEffect(() => {
    if (games.length === 0) {
      getAllGamesWithoutReviewUser(ReduxUserData.credentials?.token)
        .then(
          result => {
            const sortedGames = result.data.data.sort((a, b) => a.name.localeCompare(b.name));

            setGames(sortedGames)
            console.log(sortedGames, "soy ShortedGames")
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])
  console.log(games, "soy GAmes");

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
                          maxLength={5}
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
                        <Form.Label>Enter Your Review:</Form.Label>
                        <Form.Control
                          className={"inputLogin"}
                          as={"textarea"}
                          rows={3}
                          name={"player_review"}
                          maxLength={300}
                          placeholder={review.surname}
                          value={review.player_review}
                          onChange={inputHandler}
                        />
                      </Form.Group>
                      {/* <div>{reviewError.surnameError}</div> */}
                      <Form.Group>
                        <Form.Label>Is Favourite?</Form.Label>
                        <Form.Select
                          className={"inputLogin"}
                          name={"favourite"}
                          value={review.favourite}
                          onChange={inputHandler}
                        >
                          {favouriteOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Select a game:</Form.Label>
                        <Form.Select
                          name="game_id"
                          value={review.game_id}
                          onChange={(e) => inputHandler(e)}
                          onBlur={(e) => checkError(e)}
                        >
                          <option value="">-- Select a game --</option>
                          {games.map((game) => (
                            <option key={game.id} value={game.id}>
                              {game.name}
                            </option>
                          ))}
                        </Form.Select>
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

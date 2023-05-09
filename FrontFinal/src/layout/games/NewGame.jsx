import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewGame } from "../services/apiCalls";
import { userData } from "../userSlice";
import { validate } from "../../helpers/useful";
import { InputText } from "../../components/InputText";

export const NewGame = () => {
  //REDUX USER DATA
  const userRedux = useSelector(userData);
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");

  const [games, setGames] = useState({
    name: "",
    description: "",
    score: "",
    genre: "",
    publisher: "",
    release_date: "",
    game_image: ""
  });

  const [gamesError, setGamesError] = useState({
    nameError: "",
    descriptionError: "",
    scoreError: "",
    genreError: "",
    publisherError: "",
    release_dateError: "",
  });

  const [valiGames, setValiGames] = useState({
    nameVali: false,
    descriptionVali: false,
    scoreVali: false,
    genreVali: false,
    publisherVali: false,
    release_dateVali: false,
  });

  const [registerAct, setRegisterAct] = useState(false);

  const inputHandler = (e) => {
    setGames((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //VALIDATION && CHECKERROR
  useEffect(() => {
    for (let error in gamesError) {
      if (gamesError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let vacio in games) {
      if (games[vacio] === "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let validated in valiGames) {
      if (valiGames[validated] === false) {
        setRegisterAct(false);
        return;
      }
    }
    setRegisterAct(true);
  });

  const checkError = (e) => {
    let error = "";
    const checked = validate(e.target.name, e.target.value, e.target.required);
    error = checked.message;
    setValiGames((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));
    setGamesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  //CONST NEWGAME AND REDIRECT TO GetAllGamesAdmin.jsx
  const newGame = () => {
    postNewGame(games, userRedux.credentials.token)
      .then((result) => {
        setGames(result.data);
        setWelcome(`Correctly registered ${games.name}`);
        setTimeout(() => {
          navigate("/games/all");
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="divPrincipal">
        <div className="loginDesign">
          {welcome !== "" ? (
            <div>{welcome}</div>
          ) : (
            <div className="NewGameDiv">
              <Card className="CardNewGame">
                <Row >
                  <Col>
                    <Form className="FormNewGame">
                      <Form.Group>
                        <Form.Label>Game Name:</Form.Label>
                        <InputText
                          className={
                            gamesError.emailError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"text"}
                          name={"name"}
                          maxLength={50}
                          placeholder={"Enter game name"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Description:</Form.Label>
                        <InputText
                          className={
                            gamesError.passwordError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"text"}
                          name={"description"}
                          maxLength={400}
                          placeholder={"Enter description"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Score:</Form.Label>
                        <InputText
                          className={
                            gamesError.emailError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"float"}
                          name={"score"}
                          maxLength={50}
                          placeholder={"Enter score game"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Genre:</Form.Label>
                        <InputText
                          className={
                            gamesError.passwordError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"text"}
                          name={"genre"}
                          maxLength={64}
                          placeholder={"Enter genre"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Publisher:</Form.Label>
                        <InputText
                          className={
                            gamesError.emailError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"text"}
                          name={"publisher"}
                          maxLength={50}
                          placeholder={"Enter game publisher"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Release Date:</Form.Label>
                        <InputText
                          className={
                            gamesError.passwordError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"date"}
                          name={"release_date"}
                          maxLength={64}
                          placeholder={"Enter release_date"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Game Image URL:</Form.Label>
                        <InputText
                          className={
                            gamesError.passwordError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"text"}
                          name={"game_image"}
                          placeholder={"Enter image URL"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <br />
                      <div className="buttonRegisterGame">
                        <Button
                          className=""
                          variant="primary"
                          onClick={newGame}
                        >
                          New Game
                        </Button></div>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewGame } from "../services/apiCalls";
import { userData } from "../userSlice";
import { validate } from "../../helpers/useful";
import { InputText } from "../../components/InputText";

export const NewGame = () => {
  const userRedux = useSelector(userData);
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");

  const [credenciales, setCredenciales] = useState({
    name: "",
    description: "",
    score: "",
    genre: "",
    publisher: "",
    release_date: "",
    game_image: ""
  });

  const [credencialesError, setCredencialesError] = useState({
    nameError: "",
    descriptionError: "",
    scoreError: "",
    genreError: "",
    publisherError: "",
    release_dateError: "",
  });

  const [valiCredenciales, setValiCredenciales] = useState({
    nameVali: false,
    descriptionVali: false,
    scoreVali: false,
    genreVali: false,
    publisherVali: false,
    release_dateVali: false,
  });

  const [registerAct, setRegisterAct] = useState(false);

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    for (let error in credencialesError) {
      if (credencialesError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let vacio in credenciales) {
      if (credenciales[vacio] === "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let validated in valiCredenciales) {
      if (valiCredenciales[validated] === false) {
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
    setValiCredenciales((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));
    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const newJuego = () => {
    postNewGame(credenciales, userRedux.credentials.token)
      .then((resultado) => {
        setCredenciales(resultado.data);
        setWelcome(`Correctly registered ${credenciales.name}`);
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
                            credencialesError.emailError === ""
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
                            credencialesError.passwordError === ""
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
                            credencialesError.emailError === ""
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
                            credencialesError.passwordError === ""
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
                            credencialesError.emailError === ""
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
                            credencialesError.passwordError === ""
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
                            credencialesError.passwordError === ""
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
                          onClick={newJuego}
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

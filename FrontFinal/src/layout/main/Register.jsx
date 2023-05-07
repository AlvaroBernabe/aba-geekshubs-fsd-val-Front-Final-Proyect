import React, { useState, useEffect } from "react";
import { Card, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { InputText } from "../../components/InputText";
import { registerUser } from "../services/apiCalls";

export function Register() {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");

  const renderTooltip = (props) => (
    <Tooltip id="ButtonRegister-tooltip" {...props}>
      You must first fill the input
    </Tooltip>
  )

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [valiCredentials, setValiCredentials] = useState({
    emailVali: false,
    passwordVali: false,
  });

  const [registerAct, setRegisterAct] = useState(false);
  const [allValidated, setAllValidated] = useState(false);

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    for (let error in credentialsError) {
      if (credentialsError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let vacio in credentials) {
      if (credentials[vacio] === "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
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
    setValiCredentials((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));
    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
    setAllValidated(
      credentials.email !== "" &&
      credentials.password !== "" &&
      credentialsError.emailError === "" &&
      credentialsError.passwordError === "" &&
      valiCredentials.emailVali &&
      valiCredentials.passwordVali
    );
  };

  const newUser = () => {
    registerUser(credentials)
      .then(() => {
        setWelcome(`Correctly registered ${credentials.email}`);
        setTimeout(() => {
          navigate("/login");
        }, 2500);
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
          <Container>
            <Row className="AllRegisterForm">
              <Col lg={6}>
                <Card className="cardRegister">
                  <Form className="FormRegister">
                    <Form.Group>
                      <Form.Label><b>Enter email address:</b></Form.Label>
                      <InputText
                        className={
                          credentialsError.emailError === ""
                            ? "inputBasicDesign"
                            : "inputBasicDesign inputErrorDesign"
                        }
                        type={"email"}
                        name={"email"}
                        autoComplete="on"
                        maxLength={70}
                        placeholder={"Enter a valid email"}
                        required={true}
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                    </Form.Group>
                    <div className="errorDiv">{credentialsError.emailError}</div>
                    <Form.Group>
                      <Form.Label><b>Enter password:</b></Form.Label>
                      <InputText
                        className={
                          credentialsError.passwordError === ""
                            ? "inputBasicDesign"
                            : "inputBasicDesign inputErrorDesign"
                        }
                        type={"password"}
                        name={"password"}
                        autoComplete="on"
                        maxLength={64}
                        placeholder={"Enter a valid password"}
                        required={true}
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                    </Form.Group>
                    <div className="errorDiv">
                      {credentialsError.passwordError}
                    </div>
                    <br />
                    <div className="ButtonRegister">
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 300 }}
                        overlay={renderTooltip}
                      >
                        <Button
                          className={
                            registerAct ? "registerSendAct" : "registerSendDeac"
                          }
                          onClick={newUser}
                        >
                          Register
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
}

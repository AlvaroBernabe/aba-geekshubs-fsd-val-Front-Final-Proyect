import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { validate } from "../../helpers/useful";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/InputText/InputText";
import { registerUser } from "../services/apiCalls";

export function Register() {
    const navigate = useNavigate();
    const [welcome, setWelcome] = useState("");

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [valiUser, setValiUser] = useState({
    emailVali: false,
    passwordVali: false,
  });

  const [registerAct, setRegisterAct] = useState(false);

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(credenciales);
    console.log(valiUser);
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
    for (let validated in valiUser) {
      if (valiUser[validated] === false) {
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
    setValiUser((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));
    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const newUser = () => {
    registerUser(credenciales)
      .then(() => {
        setWelcome(`Correctly registered ${credenciales.email}`);
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
        <div className="RegisterForm">
          {welcome !== "" ? (
            <div>{welcome}</div>
          ) : (
              <Container>
                <Row className="registerrForm">
                  <Col lg={6}>
                    <Form className="formRegister">
                      <Form.Group>
                        <Form.Label>Enter your email address:</Form.Label>
                        <InputText
                          className={
                            credencialesError.emailError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"email"}
                          name={"email"}
                          maxLength={70}
                          placeholder={"Enter your email"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <div className="errorDiv">{credencialesError.emailError}</div>
                      <Form.Group>
                        <Form.Label>Enter your password:</Form.Label>
                        <InputText
                          className={
                            credencialesError.passwordError === ""
                              ? "inputBasicDesign"
                              : "inputBasicDesign inputErrorDesign"
                          }
                          type={"password"}
                          name={"password"}
                          maxLength={64}
                          placeholder={"Enter your password"}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <div className="errorDiv">
                        {credencialesError.passwordError}
                      </div>
                      <br />
                      <div className="ButtonRegister">
                      <Button
                        className={
                          registerAct ? "registerSendAct" : "registerSendDeac"
                        }
                        onClick={newUser}
                      >
                        Register
                      </Button></div>
                    </Form>
                  </Col>
                </Row>
              </Container>
          )}
        </div>
    </>
  );
}

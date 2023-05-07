import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { validate } from "../../helpers/useful";
import { loginUpdate } from "../services/apiCalls";
import { InputText } from "../../components/InputText";

export const ChangeLogin = ({ onPasswordUpdate }) => {
  const userRedux = useSelector(userData);
  let email = userRedux?.credentials?.usuario?.email;
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [user, setUser] = useState({
    email: email,
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [valiuser, setValiuser] = useState({
    emailVali: true,
    passwordVali: false,
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [registerAct, setRegisterAct] = useState(false);

  useEffect(() => {
    for (let error in userError) {
      if (userError[error] != "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let empty in user) {
      if (user[empty] === "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let validated in valiuser) {
      if (valiuser[validated] === false) {
        setRegisterAct(false);
        return;
      }
    }
    setRegisterAct(true);
  });

  const checkError = (e) => {
    let error = "";
    let checked = validate(
      e.target.name,
      e.target.value,
      e.target.required
    );

    error = checked.message;
    setValiuser((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const checkConfirmPassword = (e) => {
    let error = "";
    if (e.target.value !== user.password) {
      error = "Passwords do not match";
    }
    setConfirmPasswordError(error);
  };

  const updateLogin = () => {
    if (user.password !== user.confirmPassword) {
      setWelcome(`Passwords do not match`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
      return;
    }
    try {
      loginUpdate({ password: user.password }, userRedux.credentials?.token);
      setWelcome(`Correctly Updated Password`);
      setTimeout(() => {
        onPasswordUpdate();
      }, 2000);
    } catch (error) {
      setWelcome(`Password Error`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
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
          <div>
            <Container>
              <Row className="ChangePassword">
                <Col lg={6}>
                  <Form>
                    <Form.Group>
                      <Form.Label>
                        Enter your new password:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"password"}
                        name={"password"}
                        maxLength={70}
                        placeholder={""}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <div>{userError.passwordError}</div>
                    <br />
                    <Form.Group>
                      <Form.Label>Confirm your new password:</Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"password"}
                        name={"confirmPassword"}
                        maxLength={70}
                        placeholder={""}
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => {
                          checkConfirmPassword(e);
                          checkError(e);
                        }}
                      />
                    </Form.Group>
                    <div>{userError.confirmPasswordError}</div>
                    <br />
                    <Button
                      className="botonLog"
                      variant="warning"
                      onClick={() => updateLogin()}
                    >
                      {" "}
                      Update Password
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

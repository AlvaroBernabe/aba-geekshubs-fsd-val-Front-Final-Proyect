import React, { useEffect, useState } from "react";
import { userData } from "../../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../helpers/useful";
import { getMyProfile, profileUpdate } from "../../services/apiCalls";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../../components/InputText/InputText";

export const ProfileUpdate = () => {
  const credentialsRdx = useSelector(userData);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    phone_number: "",
    direction: "",
    birth_date: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [valiuser, setValiuser] = useState({
    nameVali: true,
    surnameVali: true,
    phone_numberVali: true,
    directionVali: true,
    birth_dateVali: true,
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    phone_numberError: "",
    directionError: "",
    birth_dateError: "",
  });

  const [registerAct, setRegisterAct] = useState(false);
  const [welcome, setWelcome] = useState("");

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


  useEffect(() => {
    if (user.name === "") {
      getMyProfile(credentialsRdx.credentials.token)
        .then((result) => {
          console.log(result);
          // console.log("esto es name", result.data.data[1][0].name);
          setUser({
            name: result.data.data[1][0].name,
            surname: result.data.data[1][0].surname,
            phone_number: result.data.data[1][0].phone_number,
            email: result.data.data[0],
            direction: result.data.data[1][0].direction,
            birth_date: result.data.data[1][0].birth_date,
          });
        })
        .catch((error) => console.log(error));
    }
  }, []);


  const updateUser = () => {
    try {
      profileUpdate(user, credentialsRdx.credentials.token);
      setWelcome(`Correctly Updated Profile`);
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    } catch (error) {
      setWelcome(`Updated Profile Error`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  };
  console.log(user, "hola soy user");
  console.log(valiuser, "hola soy vali user");

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
              <Row className="updateProfile">
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label>
                        Enter your name:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"text"}
                        name={"name"}
                        maxLength={70}
                        placeholder={user.name}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <div>{userError.nameError}</div>
                    <Form.Group>
                      <Form.Label>
                        Enter your surname:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"text"}
                        name={"surname"}
                        maxLength={70}
                        placeholder={user.surname}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <div>{userError.surnameError}</div>
                    <Form.Group>
                      <Form.Label>
                        Enter your phone_number:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"integer"}
                        name={"phone_number"}
                        maxLength={70}
                        placeholder={user.phone_number}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <div>{userError.phone_numberError}</div>
                    <Form.Group>
                      <Form.Label>
                        Enter your direction:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"text"}
                        name={"direction"}
                        maxLength={70}
                        placeholder={user.direction}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <div>{userError.directionError}</div>
                    <Form.Group>
                      <Form.Label>
                        Enter your birth_date:
                      </Form.Label>
                      <InputText
                        className={"inputLogin"}
                        type={"date"}
                        name={"birth_date"}
                        maxLength={70}
                        placeholder={user.birth_date}
                        changeFunction={(e) =>
                          inputHandler(e)
                        }
                        blurFunction={(e) =>
                          checkError(e)
                        }
                      />
                    </Form.Group>
                    <br />
                    <div className="buttonUpdate">
                      <Button
                        className=""
                        variant="primary"
                        onClick={() => updateUser()}
                      >
                        {" "}
                        Update User
                      </Button></div>
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

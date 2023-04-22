import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { newReview } from "../services/apiCalls";
import NavBar from "../../components/NavBar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";

export const NewReview = () => {

    const ReduxUserData = useSelector(userData);
    // console.log( ReduxUserData.credentials.usuario.id, "esto es id en teoria");

    const navigate = useNavigate();

    const [user, setUser] = useState({
        player_score: "",
        player_review: "",
        favourite: "",
        game_id: "",
        user_id: ReduxUserData.credentials.usuario.id,
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


    const reviewNew = () => {
        newReview(appointments, ReduxUserData.credentials.token)
            .then( (resultado) => {
                setAppointments(resultado.data)
                // setWelcome(`Cita creada correctamente para el día: ${appointments.date}`);
                // setTimeout(()=>{
                //     navigate('/user/myprofile');
                // },3500);
            })
            .catch(error => {
                setAppointments(error.message);
            });
    }

    // console.log(user, "hola soy user");
    // console.log(valiuser, "hola soy vali user");

    return (
        <>
            <NavBar />
            <hr />
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

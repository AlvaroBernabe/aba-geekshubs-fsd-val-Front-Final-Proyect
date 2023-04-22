import React, { useEffect, useState } from "react";
import { userData } from "../../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUpdate } from "../../services/apiCalls";
import NavBar from "../../../components/NavBar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../../components/InputText/InputText";
import { validate } from "../../../helpers/useful";

export const ChangeLogin = () => {
    const credentialsRdx = useSelector(userData);
    let email = credentialsRdx?.credentials?.usuario?.email;
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: email,
        password: "",
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

    const updateLogin = () => {
        
        try {
            loginUpdate(user, credentialsRdx.credentials?.token);
            
        } catch (error) {
            
        }
        console.log("victoria");
        // setWelcome(`Correctly Updated Profile`);
        // setTimeout(() => {
        //     navigate("/user/myprofile");
        // }, 2500);
    };

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
                                            <Button
                                                className="botonLog"
                                                // variant="primary"
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
            </div>
        </>
    );
};


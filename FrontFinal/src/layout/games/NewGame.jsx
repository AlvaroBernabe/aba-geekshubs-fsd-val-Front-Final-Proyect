import React, { useEffect, useState } from "react";
import { validate } from "../../helpers/useful";
import { postNewGame } from "../services/apiCalls";
import NavBar from "../../components/NavBar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const NewGame = () => {
    const ReduxUserData = useSelector(userData);

    //   const navigate = useNavigate();
    //   const [welcome, setWelcome] = useState("");

    const [credenciales, setCredenciales] = useState({
        name: "",
        description: "",
        score: "",
        genre: "",
        publisher: "",
        release_date: "",
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
        // console.log(credenciales);
        // console.log(valiUser);
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
        postNewGame(credenciales, ReduxUserData.credentials.token)
            .then((resultado) => {
                setCredenciales(resultado.data)
                setWelcome(`Correctly registered ${credenciales.name}`);
                setTimeout(() => {
                  navigate("/games/all");
                }, 2500);
            })
            .catch((error) => console.log(error));
    };

    console.log(credenciales, "esto es credenciales");
    console.log(valiCredenciales, "esto es Valicredenciales");

    return (
        <>
            <NavBar />
            <hr />
            {/* <div className="divPrincipal">
            <div className="loginDesign">
                {welcome !== "" ? (
            <div>{welcome}</div>
        ) : ( */}
            <div className="divPrincipal">
                <Container>
                    <Row className="registerForm">
                        <Col lg={6}>
                            <Form className="formRegister">
                                <Form.Group>
                                    <Form.Label>Enter game name:</Form.Label>
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
                                {/* <div className="errorDiv">{credencialesError.emailError}</div> */}
                                <Form.Group>
                                    <Form.Label>Enter your description:</Form.Label>
                                    <InputText
                                        className={
                                            credencialesError.passwordError === ""
                                                ? "inputBasicDesign"
                                                : "inputBasicDesign inputErrorDesign"
                                        }
                                        type={"text"}
                                        name={"description"}
                                        maxLength={64}
                                        placeholder={"Enter description"}
                                        required={true}
                                        changeFunction={(e) => inputHandler(e)}
                                        blurFunction={(e) => checkError(e)}
                                    />
                                </Form.Group>
                                {/* <div className="errorDiv">
                                {credencialesError.passwordError}
                                </div> */}
                                                                <Form.Group>
                                    <Form.Label>Enter score game:</Form.Label>
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
                                {/* <div className="errorDiv">{credencialesError.emailError}</div> */}
                                <Form.Group>
                                    <Form.Label>Enter genre:</Form.Label>
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
                                {/* <div className="errorDiv">
                                {credencialesError.passwordError}
                                </div> */}
                                                                <Form.Group>
                                    <Form.Label>Enter publisher game:</Form.Label>
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
                                {/* <div className="errorDiv">{credencialesError.emailError}</div> */}
                                <Form.Group>
                                    <Form.Label>Enter game release_date:</Form.Label>
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
                                {/* <div className="errorDiv">
                                {credencialesError.passwordError}
                                </div> */}
                                <br />
                                <Button
                                    className={
                                        registerAct ? "registerSendDeac" : "registerSendAct"
                                    }
                                    onClick={newJuego}
                                >
                                    Register User
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* )} */}
            {/* </div> */}
            {/* </div> */}
        </>
    );
};

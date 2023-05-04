import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "./userSlice";
import { useSelector } from "react-redux";
import { createNewNews } from "./services/apiCalls";
import { InputText } from "../components/InputText/InputText";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export const NewNews = () => {
    const userRedux = useSelector(userData);

    const navigate = useNavigate();
    const [welcome, setWelcome] = useState("");


    const [news, setNews] = useState({
        news_image: "",
        title: "",
        summary: "",
        game_id: "",
    });


    const inputHandler = (e) => {
        setNews((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const checkError = (e) => { e };

    const newNews = () => {
        createNewNews(news, userRedux.credentials.token)
            .then((resultado) => {
                setNews(resultado.data);
                setWelcome(`Correctly Created Review ${news.title}`);
                setTimeout(() => {
                    navigate("/news/all");
                }, 2500);
            })
            .catch((error) => console.log(error));
    };

    console.log(news, "esto es news");

    return (
        <>
            {/* <div className="divPrincipal">
              <div className="loginDesign">
                  {welcome !== "" ? (
              <div>{welcome}</div>
          ) : ( */}
            <div className="NewGameDiv">
                <Card className="CardNewGame">
                    <Row >
                        <Col>
                            <Form className="FormNewGame">
                                <Form.Group>
                                    <Form.Label>News Image:</Form.Label>
                                    <InputText
                                        className="inputBasicDesign"
                                        type={"text"}
                                        name={"news_image"}
                                        maxLength={50}
                                        placeholder={"Enter News Image"}
                                        required={true}
                                        changeFunction={(e) => inputHandler(e)}
                                        blurFunction={(e) => checkError(e)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>News Title:</Form.Label>
                                    <InputText
                                        className="inputBasicDesign"
                                        type={"text"}
                                        name={"title"}
                                        maxLength={50}
                                        placeholder={"Enter title"}
                                        required={true}
                                        changeFunction={(e) => inputHandler(e)}
                                        blurFunction={(e) => checkError(e)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>News Summary:</Form.Label>
                                    <InputText
                                        className="inputBasicDesign"
                                        type={"float"}
                                        name={"summary"}
                                        maxLength={500}
                                        placeholder={"Enter summary"}
                                        required={true}
                                        changeFunction={(e) => inputHandler(e)}
                                        blurFunction={(e) => checkError(e)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Game Id:</Form.Label>
                                    <InputText
                                        className="inputBasicDesign"
                                        type={"integer"}
                                        name={"game_id"}
                                        maxLength={999}
                                        placeholder={"Enter genre"}
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
                                        onClick={newNews}
                                    >
                                        New Game
                                    </Button></div>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    );
};

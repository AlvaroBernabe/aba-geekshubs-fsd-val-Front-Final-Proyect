import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { createNewNews } from "../services/apiCalls";
import { InputText } from "../../components/InputText";

export const NewNews = () => {
  //REDUX USER DATA
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

  //CONST POST NEW NEWS AND REDIRECT TO GetAllNews.jsx
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
                      <Form.Label>Game ID:</Form.Label>
                      <InputText
                        className="inputBasicDesign"
                        type={"integer"}
                        name={"game_id"}
                        maxLength={999}
                        placeholder={"Enter Game ID"}
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
                        New News
                      </Button></div>
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

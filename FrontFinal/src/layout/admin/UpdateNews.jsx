import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { newsUpdate } from "../services/apiCalls";
import { InputText } from "../../components/InputText";

export const UpdateNews = () => {

  const userRedux = useSelector(userData);
  const NewsData = useSelector(detailData)
  const params = NewsData?.choosenObject?.news?.id

  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");

  const [news, setNews] = useState({
    title: NewsData.choosenObject.news.title,
    summary: NewsData.choosenObject.news.summary,
    game_id: NewsData?.choosenObject?.news.game_id,
  });

  const inputHandler = (e) => {
    setNews((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => { e };

  const updateNews = () => {
    newsUpdate(params, news, userRedux?.credentials?.token)
      .then((resultado) => {
        setNews(resultado?.data)
        setWelcome(`${news.title} Updated Correctly`);
        setTimeout(() => {
          navigate("/news/all/admin");
        }, 1500);
      })
      .catch(error => {
        setNews(error.message);
      });
  }

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
              <Row className="updateReviewModal">
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label><b>Title:</b></Form.Label>
                      <InputText
                        className={"inputBasicDesign"}
                        type={"text"}
                        name={"title"}
                        maxLength={70}
                        placeholder={NewsData?.choosenObject?.news?.title}
                        required={true}
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label><b>Summary:</b></Form.Label>
                      <Form.Control
                        className={"inputLogin"}
                        as={"textarea"}
                        rows={3}
                        name={"summary"}
                        maxLength={300}
                        placeholder={NewsData?.choosenObject?.news?.summary}
                        value={news?.summary}
                        onChange={inputHandler}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label><b>Game Id:</b></Form.Label>
                      <InputText
                        className={"inputBasicDesign"}
                        type={"email"}
                        name={"game_id"}
                        maxLength={70}
                        placeholder={NewsData?.choosenObject?.news?.game_id}
                        required={true}
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                    </Form.Group>
                    <br />
                    <div className='botonNewReview'>
                      <Button
                        className="botonLog"
                        variant="primary"
                        onClick={() => updateNews()}
                      >
                        Update News
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


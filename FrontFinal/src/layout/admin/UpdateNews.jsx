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
    const [newsw, setNewws] = useState([]);

    const params = NewsData?.choosenObject?.news?.id
    console.log(params, "esto params")

    const navigate = useNavigate();
    const [welcome, setWelcome] = useState("");

    const [news, setNews] = useState({
        id: NewsData.choosenObject.news.id,
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
    // useEffect(() => {
    //   if (reviews.length === 0) {
    //     getAllNewsNonUser()
    //       .then((result) => {
    //         // console.log(result, "hola soy result");
    //         setReview(result?.data?.data?.Reviews);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    // }, [reviews]);
    // // console.log(games, "soy GAmes");

    const updateReview = () => {
        newsUpdate(params, news, userRedux?.credentials?.token)
            .then((resultado) => {
                // console.log(ReduxUserData.credentials.token);
                console.log(resultado, "esto vale resultado");
                setNews(resultado?.data)
                // setWelcome(`news Updated Correctly`);
                // setTimeout(() => {
                //     window.location.reload(true);
                // }, 1500);
            })
            .catch(error => {
                setNews(error.message);
            });
    }

    console.log(news, "hola es news Update");

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
                                            <Form.Label>title:</Form.Label>
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
                                            <Form.Label>summary:</Form.Label>
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
                                            <Form.Label>Game Id:</Form.Label>
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
                                                onClick={() => updateReview()}
                                            >
                                                Update Review
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


import React, { useEffect, useState } from "react";
import { getAllNewsNonUser, newsDestroy } from "./services/apiCalls";
import { Button, Card, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailData, detailGame } from "./detailSlice";
import { userData } from "./userSlice";

export const GetAllNewsAdmin = () => {

    const userRedux = useSelector(userData);
    const NewsData = useSelector(detailData)
    const [news, setNews] = useState([]);
    const dispatch = useDispatch();
    const params = NewsData?.choosenObject?.news?.id

    useEffect(() => {
        if (news.length === 0) {
            getAllNewsNonUser()
                .then(
                    result => {
                        setNews(result.data.data)
                        console.log(result.data.data, "esto es result.data")
                    }
                )
                .catch(error => console.log(error));
        }
    }, [news])
    // console.log(games);

    const selected = (newws) => {
        console.log(newws)
        dispatch(detailGame({ choosenObject: newws }));
        // setTimeout(() => {
        //   navigate("/appointment/update");
        // }, 1000);
    };




    const newsDelete = async () => {
        newsDestroy(params, userRedux?.credentials?.token)
          .then(() => {
            // setWelcome(`Correctly Deleted ${NewsData?.choosenObject?.news?.title} Review`);

          })
          .catch((error) => console.log(error));
      };

    return (
        <>
            <Container fluid>
                {news.map((neww) => {
                    console.log(neww, "hola soy game");
                    return (
                        <Col className="ContainerAllGamesAdmin" onClick={() => selected(neww)} key={neww.id}>
                            <Card className="CardNews">
                                <Card.Img className="imgNews" variant="top" src={neww.news.news_image} />
                                <Card.Body>
                                    <ul>
                                        <span className="gameTitle">{neww.name}</span>
                                        <li>
                                            <span className="textColor">Title: </span>
                                            {neww.news.title}
                                        </li>
                                        <li>
                                            <span className="textColor">Game Name: </span>
                                            {neww.game_name}
                                        </li>
                                        <li>
                                            <span className="textColor">Summary: </span>
                                            {neww.news.summary}
                                        </li>
                                    </ul>
                                </Card.Body>
                                    <div className="ButtonModalProfile">
                                <Button variant="info" >
                                    Update News
                                </Button>
                                <Button variant="warning" onClick={newsDelete} >
                                    Delete News
                                </Button></div>
                        </Card>
                        </Col>
            );
                })}
        </Container >
        </>
    );
}

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData, detailGame } from "../detailSlice";
import { getAllNewsNonUser, newsDestroy } from "../services/apiCalls";

export const GetAllNewsAdmin = () => {

  const userRedux = useSelector(userData);
  const NewsData = useSelector(detailData)
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const params = NewsData?.choosenObject?.news?.id
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (news.length === 0) {
      getAllNewsNonUser()
        .then(
          result => {
            setNews(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [news])

  const selected = (newws) => {
    dispatch(detailGame({ choosenObject: newws }));
  };

  const newsDelete = async () => {
    newsDestroy(params, userRedux?.credentials?.token)
      .then(() => {
        setWelcome(`Correctly Deleted Review`);
        setTimeout(() => {
          setWelcome(``);
          getAllNewsNonUser()
            .then(
              result => {
                setNews(result.data.data)
              }
            )
            .catch(error => console.log(error));
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  const newsUpdate = async () => {
    try {
      setTimeout(() => {
        navigate("/news/all/update");
      }, 1000);
    } catch (error) {
    }
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
            <Container fluid>
              {news.map((neww) => {
                return (
                  <Col className="ContainerAllGamesAdmin" onClick={() => selected(neww)} key={neww.id}>
                    <Card className="CardNews">
                      <Card.Img className="imgNews" variant="top" src={neww.news.news_image} />
                      <Card.Body>
                        <ul>
                          <span className="gameTitle">{neww.name}</span>
                          <li>
                            <span className=""><b>Title: </b></span>
                            {neww.news.title}
                          </li>
                          <li>
                            <span className=""><b>Game Name: </b></span>
                            {neww.game_name}
                          </li>
                          <li>
                            <span className=""><b>Summary: </b></span>
                            {neww.news.summary}
                          </li>
                        </ul>
                      </Card.Body>
                      <div className="ButtonModalProfile">
                        <Button variant="info" onClick={newsUpdate}>
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
          </div>
        )}
      </div>
    </>

  );
}

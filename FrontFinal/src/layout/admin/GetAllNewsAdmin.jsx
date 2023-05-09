import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData, detailGame } from "../detailSlice";
import { getAllNewsNonUser, newsDestroy } from "../services/apiCalls";

export const GetAllNewsAdmin = () => {
  //REDUX USER DATA && NEWS DETAILS
  const userRedux = useSelector(userData);
  const newsData = useSelector(detailData)
  const [welcome, setWelcome] = useState("");
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = newsData?.choosenObject?.news?.id

  //GET ALL NEWS
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

  //SAVE IN REDUX SELECTED NEWS FOR THE UPDATE
  const selected = (newws) => {
    dispatch(detailGame({ choosenObject: newws }));
  };

  //DELETE NEWS CONST
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

  //CONST UPDATE NEWS TO UpdateNews.jsx
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
                  <Col className="ContainerAllGamesAdmin" onClick={() => selected(neww)} key={neww.news.id}>
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

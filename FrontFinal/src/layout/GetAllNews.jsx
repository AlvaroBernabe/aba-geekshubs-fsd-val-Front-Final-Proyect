import React, { useEffect, useState } from "react";
import { getAllNewsNonUser } from "./services/apiCalls";
import { Card, Col, Container, Row } from "react-bootstrap";

export const GetAllNews = () => {

  const [news, setNews] = useState([]);
  //   const navigate = useNavigate();

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

  return (
    <>
      <Container fluid>
          {news.map((neww) => {
            console.log(neww, "hola soy game");
            return (
              <Col className="ContainerAllGamesAdmin" onClick={() => selected(neww)} key={neww.id}>
                <Card className="CardNews">
                  <Card.Img  className="imgNews" variant="top" src={neww.news.news_image} />
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
                </Card>
              </Col>
            );
          })}
      </Container>
    </>
  );
}


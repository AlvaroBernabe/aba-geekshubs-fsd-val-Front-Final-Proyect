import React, { useEffect, useState } from "react";
import { getAllNewsNonUser } from "./services/apiCalls";
import { Card, Col, Container, Row } from "react-bootstrap";

export const GetAllNews = () => {

  const [news, setNews] = useState([]);
  //   const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState(null);

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

  const handleNewsSelect = (e) => {
    const selectedNewsId = parseInt(e.target.value);
    const selectedNews = news.find((news) => news.news.id === selectedNewsId);
    setSelectedNews(selectedNews);
  };

  return (
    <>
      <select onChange={handleNewsSelect}>
        <option value="">Select News</option>
        {news.map((neww) => (
          console.log(neww),
          <option key={neww.news.id} value={neww.news.id}>
            {neww.news.title}
          </option>
        ))}
      </select>
      {selectedNews ? (
        <Col>
          <Card className="CardNews">
            <Card.Img
              className="imgNews"
              variant="top"
              src={selectedNews.news.news_image}
            />
            <Card.Body>
              <ul>
                <span className="gameTitle">{selectedNews.name}</span>
                <li>
                  <span className="textColor">Title: </span>
                  {selectedNews.news.title}
                </li>
                <li>
                  <span className="textColor">Game Name: </span>
                  {selectedNews.game_name}
                </li>
                <li>
                  <span className="textColor">Summary: </span>
                  {selectedNews.news.summary}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <div> Select News To See Details</div>
      )}
    </>
  );
}


import React, { useEffect, useState } from "react";
import { getAllNewsNonUser } from "./services/apiCalls";
import { Card, Col} from "react-bootstrap";

export const GetAllNews = () => {

  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

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
                  <span className="texGetAllNews"><b>Title: </b></span>
                  {selectedNews.news.title}
                </li>
                <li>
                  <span className="texGetAllNews"><b>Game Name: </b></span>
                  {selectedNews.game_name}
                </li>
                <li>
                  <span className="texGetAllNews"><b>Summary: </b></span>
                  {selectedNews.news.summary}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <div><b> Select News To See Details</b></div>
      )}
    </>
  );
}


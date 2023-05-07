import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getAllGamesWithoutReviewUser } from "../services/apiCalls";
import { addChoosen } from "../detailSlice";
import CardGamesUser from "../../components/CardGamesUser";
import { Col, Container, Row } from "react-bootstrap";

export const GetAllGamesUser = () => {

  const [games, setGames] = useState([]);
  const userRedux = useSelector(userData);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const [searchScore, setSearchScore] = useState('');

  useEffect(() => {
    if (games.length === 0) {
      getAllGamesWithoutReviewUser(userRedux.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

  const selected = (juego) => {
    dispatch(addChoosen({ choosenObject: juego }))
  }
  
  const findGames = games.filter((game) => {
    return game.name.toLowerCase().includes(searchName.toLowerCase()) &&
      game.genre.toString().toLowerCase().includes(searchGenre.toLowerCase()) &&
      game.publisher.toString().toLowerCase().includes(searchPublisher.toLowerCase()) &&
      game.score >= searchScore;
  });

  return (
    <>
      <Container fluid>
        <div className="search-bar">
          <input type="text" placeholder="Search By Name" onChange={(e) => setSearchName(e.target.value)} />
          <input type="text" placeholder="Search By Genre" onChange={(e) => setSearchGenre(e.target.value)} />
          <input type="text" placeholder="Search By Publisher" onChange={(e) => setSearchPublisher(e.target.value)} />
          <input type="number" placeholder=" Minimum Score" onChange={(e) => setSearchScore(e.target.value)} />
        </div>
        <Row className="bodyGetFavourites">
          {findGames.map((game) => {
            return (
              <Col onClick={() => selected(game)} key={game.id}>
                <CardGamesUser games={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

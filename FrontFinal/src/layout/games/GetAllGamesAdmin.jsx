import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { getAllGames } from "../services/apiCalls";
import { addChoosen } from "../detailSlice";
import CardGames from "../../components/CardGames";

export const GetAllGamesAdmin = () => {
  //REDUX USER DATA
  const userRedux = useSelector(userData);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  //USESTATE FOR THE SEARCH FILTER
  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const [searchScore, setSearchScore] = useState('');

  //GET ALL GAMES
  useEffect(() => {
    if (games.length === 0) {
      getAllGames(userRedux.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

  //SAVE IN REDUX IN DETAILSLICE SELECTED GAME
  const selected = (juego) => {
    dispatch(addChoosen({ choosenObject: juego }))
  }

  //CONST FIND GAMES USING [games]
  const findGames = games.filter((game) => {
    return game.name.toLowerCase().includes(searchName.toLowerCase()) &&
      game.genre.toString().toLowerCase().includes(searchGenre.toLowerCase()) &&
      game.publisher.toString().toLowerCase().includes(searchPublisher.toLowerCase()) &&
      game.score >= searchScore;
  });

  //CONST RELOAD GAMES FOR MODALS IN CardGames.jsx
  const reloadGames = () => {
    getAllGames(userRedux.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
          }
        )
        .catch(error => console.log(error));
  }

  return (
    <>
      <Container fluid>
        <div className="search-bar">
          <input type="text" placeholder="Search By Name" onChange={(e) => setSearchName(e.target.value)} />
          <input type="text" placeholder="Search By Genre" onChange={(e) => setSearchGenre(e.target.value)} />
          <input type="text" placeholder="Search By Publisher" onChange={(e) => setSearchPublisher(e.target.value)} />
          <input type="number" placeholder=" Minimum Score 0-10" onChange={(e) => setSearchScore(e.target.value)} />
        </div>
        <Row>
          <link rel="stylesheet" href="/login" />
          {findGames.map((game) => {
            return (
              <Col className="ContainerAllGamesAdmin" onClick={() => selected(game)} key={game.id}>
                <CardGames games={game} onReloadGames={reloadGames}/>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { Col, Container, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { getAllGames } from "../services/apiCalls";
import { addChoosen } from "../detailSlice";
import CardGames from "../../components/CardGames";



export const GetAllGamesAdmin = () => {

  const [games, setGames] = useState([]);
  const userRedux = useSelector(userData);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const [searchScore, setSearchScore] = useState('');

  useEffect(() => {
    // console.log("console log de users", users)    
    if (games.length === 0) {
      getAllGames(userRedux.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
            console.log(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])
  console.log(games);

  const selected = (juego) => {
    dispatch(addChoosen({ choosenObject: juego }))
    console.log(juego)
    // setTimeout(() => {
    //     navigate("/users/all/details");
    //   }, 500);
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
        <Row>
        <link rel="stylesheet" href="/login" />
          {findGames.map((game) => {
            console.log(game, "hola soy game");
            return (
              <Col className="ContainerAllGamesAdmin" onClick={() => selected(game)} key={game.id}>
                <CardGames games={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

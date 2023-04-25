import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../services/apiCalls";
import { userData } from "../../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import CardGames from "../../../components/CardGames";
import { addChoosen } from "../../detailSlice";

export const GetAllGames = () => {

  const [games, setGames] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  useEffect(() => {
    // console.log("console log de users", users)      // Este saca los el array con los usuarios
    if (games.length === 0) {
      getAllGames(ReduxCredentials.credentials?.token)
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

  return (
    <>
      <Container fluid>
        <Row>
          {games.map((game) => {
            console.log(game, "hola soy game");
            return (
              <Col onClick={() => selected(game)} key={game.id}>
                <CardGames games={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userData } from "../../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { addChoosen } from "../../detailSlice";
import CardGamesUser from "../../../components/CardGamesUser";
import { getAllGamesWithoutReviewUser } from "../../services/apiCalls";

export const GetAllGamesUser = () => {

  const [games, setGames] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  useEffect(() => {
    // console.log("console log de users", users)      // Este saca los el array con los usuarios
    if (games.length === 0) {
      getAllGamesWithoutReviewUser(ReduxCredentials.credentials?.token)
        .then(
          result => {
            setGames(result.data.data)
            console.log(result.data.data)
          }
        )
        .catch(error => console.log(error));
    }
  }, [games])

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
                <CardGamesUser games={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

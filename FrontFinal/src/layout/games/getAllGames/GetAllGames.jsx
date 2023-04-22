import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../services/apiCalls";
import NavBar from "../../../components/NavBar";
import { userData } from "../../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import CardGames from "../../../components/CardGames";

export const GetAllGames = () => {

    const [games, setGames] = useState([]);
      const ReduxCredentials = useSelector(userData);
    //   const dispatch = useDispatch();
    //   const navigate = useNavigate();

      useEffect(()=>{
        // console.log("console log de users", users)      // Este saca los el array con los usuarios
        if(games.length === 0){
            getAllGames(ReduxCredentials.credentials?.token)
                .then(
                    result => {
                        setGames(result.data.data)
                        console.log(result.data.data)
                    }
                )
                .catch(error => console.log(error));
        }
    },[games])
    console.log(games);

    // const selected = (persona) => {
    //     dispatch(addChoosen({ choosenObject: persona }))
    //     setTimeout(() => {
    //         navigate("/users/all/details");
    //       }, 500);
    // }


    return (
        <>
        <NavBar />
        <hr />
            <Container fluid>
                <Row>
                    {games.map((game) => {
                        return (
                            <Col onClick={() => gameSelect(game)} key={game.id}>
                                <CardGames appo={game} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
      </>
    );
}

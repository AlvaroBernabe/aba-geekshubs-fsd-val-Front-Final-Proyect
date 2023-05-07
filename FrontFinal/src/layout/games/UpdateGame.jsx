import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { gameUpdate } from "../services/apiCalls";
import { InputText } from "../../components/InputText";

export const UpdateGame = ({ onCardUpdate }) => {

  const userRedux = useSelector(userData);
  const ReduxAppointment = useSelector(detailData)
  const [welcome, setWelcome] = useState("");
  let params = ReduxAppointment.choosenObject.id;

  const [games, setGames] = useState({
    id: params,
    name: ReduxAppointment?.choosenObject?.name,
    description: ReduxAppointment?.choosenObject?.description,
    score: ReduxAppointment?.choosenObject?.score,
    genre: ReduxAppointment?.choosenObject?.genre,
    publisher: ReduxAppointment?.choosenObject?.publisher,
    release_date: ReduxAppointment?.choosenObject?.release_date,
  });

  const inputHandler = (e) => {
    setGames((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
  }

  const updateGames = () => {
    gameUpdate(params, games, userRedux.credentials.token)
      .then((resultado) => {
        setGames(resultado.data);
        setWelcome(`Correctly updated ${games.name}`);
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <InputText className={"inputLogin"}
          type={"text"} name={"name"} placeholder={ReduxAppointment.choosenObject.name} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <InputText className={"inputLogin"}
          type={"text"} name={"description"} placeholder={ReduxAppointment.choosenObject.description} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Score:</Form.Label>
        <InputText className={"inputLogin"}
          type={"float"} name={"score"} placeholder={ReduxAppointment.choosenObject.score} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Genre:</Form.Label>
        <InputText className={"inputLogin"}
          type={"text"} name={"genre"} placeholder={ReduxAppointment.choosenObject.genre} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Publisher:</Form.Label>
        <InputText className={"inputLogin"}
          type={"text"} name={"publisher"} placeholder={ReduxAppointment.choosenObject.publisher} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Release Date:</Form.Label>
        <InputText className={"inputLogin"}
          type={"date"} name={"release_date"} placeholder={"release_date"} maxLength={70}
          changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
      </Form.Group>
      <br />
      <div className='botonModificar'>
        <Button variant="primary" onClick={updateGames}>
          Update Game
        </Button>
      </div>
    </Form>
  );
}

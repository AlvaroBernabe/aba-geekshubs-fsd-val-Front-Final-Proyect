import React, { useState } from "react";
import { gameDelete } from "../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { Button } from "react-bootstrap";

export const DeleteGames = () => {
  const ReduxCredentials = useSelector(userData);
  const ReduxAppointment = useSelector(detailData);
  const [welcome, setWelcome] = useState("");

  let params = ReduxAppointment.choosenObject.id;

  const [games, setGames] = useState({
    id: params,
  });

  const GamesDelete = async () => {
    gameDelete(params, ReduxCredentials.credentials.token)
      .then(() => {
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };
  console.log(games, "esto deberia ser id de game a borrar");
  return (
    <div className="botonModificar">
      <Button variant="Light" onClick={GamesDelete}>
        Delete Game Forever
      </Button>
    </div>
  );
};

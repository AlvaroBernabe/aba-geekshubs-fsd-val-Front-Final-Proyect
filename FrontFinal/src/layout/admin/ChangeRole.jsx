import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { changeRole } from "../services/apiCalls";

export const ChangeRole = () => {

  const userRedux = useSelector(userData);
  const ReduxAppointment = useSelector(detailData);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    id: ReduxAppointment.choosenObject.id,
    role_id: 1
  });

  const changeRol = () => {
    changeRole(credenciales, userRedux.credentials.token)
      .then((resultado) => {
        setCredenciales(resultado.data)
        setWelcome(`${ReduxAppointment.choosenObject.email} is an Admin now`);
        setTimeout(() => {
          navigate("/users/all/");
        }, 1500);
      })
      .catch((error) => console.log(error));
      setWelcome(`You Can´t Update the Role of an Admin`);
  };

  return (
    <>
      <div>
        {welcome !== "" ? (
          <div className="divWellcome">
            <Card>
              <Card.Header>{welcome}</Card.Header>
            </Card>
          </div>
        ) : (
          <Form>
            <div className='botonModificar'>
              <Button variant="danger" onClick={changeRol}>
                Make Admin
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
}
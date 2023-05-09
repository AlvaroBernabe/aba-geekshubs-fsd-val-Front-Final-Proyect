import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { changeRole } from "../services/apiCalls";

export const ChangeRole = () => {
  //REDUX USER DATA && USER DETAILS
  const userRedux = useSelector(userData);
  const userDetails = useSelector(detailData);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    id: userDetails.choosenObject.id,
    role_id: 1
  });

  //CHANGE ROLE OF USERS CONST AND REDIRECT TO GetAllUsers.jsx
  const changeRol = () => {
    changeRole(credentials, userRedux.credentials.token)
      .then((result) => {
        setCredentials(result.data)
        setWelcome(`${userDetails.choosenObject.email} is an Admin now`);
        setTimeout(() => {
          navigate("/users/all/");
        }, 1500);
      })
      .catch((error) => console.log(error));
    setWelcome(`You Can´t Update the Role of an Admin`);
    setTimeout(() => {
      setWelcome(``);
      navigate("/users/all/");
    }, 1500);
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
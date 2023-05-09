import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { userDelete } from "../services/apiCalls";

export const DeleteUser = () => {
  //REDUX USER DATA && USER DETAILS
  const userRedux = useSelector(userData);
  const userDetails = useSelector(detailData);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();
  let params = userDetails.choosenObject.id;

  //DELETE USER CONST AND REDIRECT TO GetAllUsers.jsx
  const UserDelete = async () => {
    userDelete(params, userRedux.credentials.token)
      .then(() => {
        setWelcome(`Correctly Deleted ${userDetails.choosenObject.email}`);
        setTimeout(() => {
          navigate("/users/all/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setWelcome(`You Can´t Delete an Admin`);
        setTimeout(() => {
          setWelcome(``);
          navigate("/users/all/");
        }, 1500);
      });
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
          <div className="botonModificar">
            <Button variant="Light" onClick={UserDelete}>
              Delete User Forever
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

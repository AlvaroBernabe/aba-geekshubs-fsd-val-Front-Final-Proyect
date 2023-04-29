import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getMyProfile } from "../services/apiCalls";
import { Card, ListGroup } from "react-bootstrap";

export const Profile = () => {
  const ReduxCredentials = useSelector(userData);

  const [users, setUsers] = useState({
    name: "",
    surname: "",
    phone_number: "",
    direction: "",
    birth_date: "",
  });

  useEffect(() => {
    if (users.name === "") {
      getMyProfile(ReduxCredentials.credentials.token)
        .then((result) => {
          console.log(result.data.data);
          console.log("esto es name", result.data.data[1][0].name);
          setUsers({
            name: result.data.data[1][0].name,
            surname: result.data.data[1][0].surname,
            phone_number: result.data.data[1][0].phone_number,
            email: result.data.data[0],
            direction: result.data.data[1][0].direction,
            birth_date: result.data.data[1][0].birth_date,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [users]);

  return (
    <>
      <div className="divProfile">
        <Card style={{ width: "20rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span className="text1"> Name:</span>
              <span className="text2"> {users.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text1"> Email: </span>
              <span className="text2"> {users.email}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text1"> Surname: </span>
              <span className="text2"> {users.surname}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text1"> Phone Number: </span>
              <span className="text2"> {users.phone_number}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text1"> Direction: </span>
              <span className="text2"> {users.direction}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text1">Birth Date: </span>
              <span className="text2"> {users.birth_date}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getMyProfile } from "../services/apiCalls";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { ChangeLogin } from "../users/changeLogin/ChangeLogin";
import { ProfileUpdate } from "./update/ProfileUpdate";

export const Profile = () => {
  const userRedux = useSelector(userData);
  const [password, setPassword] = useState(false);
  const handleClosePassword = () => setPassword(false);
  const handleShowPassword = () => setPassword(true);

  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const handleProfileUpdate = () => {
    setUpdate(false);
    reloadProfile();
  };

  const handlePasswordUpdate = () => {
    setPassword(false);
  };


  const [users, setUsers] = useState({
    name: "",
    surname: "",
    phone_number: "",
    direction: "",
    birth_date: "",
  });

  useEffect(() => {
    if (users.name === "") {
      getMyProfile(userRedux.credentials.token)
        .then((result) => {
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


  
const reloadProfile = () => {
  getMyProfile(userRedux.credentials.token)
    .then((result) => {
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
};



  return (
    <>
      <div className="divProfile">
        <Card style={{ width: "21rem" }}>
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
              <span className="text1"> Birth Date: </span>
              <span className="text2"> {users.birth_date}</span>
            </ListGroup.Item>
          </ListGroup>
          <div className="ButtonModalProfile">
            <Button variant="primary" onClick={handleShowUpdate}>
              Update Profile
            </Button>
            <Modal show={update} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body><ProfileUpdate  onProfileUpdate={handleProfileUpdate} /></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="danger" onClick={handleShowPassword}>
              Change Password
            </Button>
            <Modal show={password} onHide={handleClosePassword}>
              <Modal.Header closeButton>
                <Modal.Title>You Sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body><ChangeLogin onPasswordUpdate={handlePasswordUpdate} /></Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClosePassword}>
                  Nope
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Card>
      </div>
    </>
  );
};

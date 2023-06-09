import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { userData } from "../userSlice";
import { getMyProfile } from "../services/apiCalls";
import { ProfileUpdate } from "./ProfileUpdate";
import { ChangeLogin } from "./ChangeLogin";

export const Profile = () => {
  //REDUX USER DATA
  const userRedux = useSelector(userData);

  //OPEN OR CLOSE CHANGE PASSWORD MODAL
  const [password, setPassword] = useState(false);
  const handleClosePassword = () => setPassword(false);
  const handleShowPassword = () => setPassword(true);

  //OPEN OR CLOSE UPDATE USER MODAL
  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  //CONST CLOSE UPDATE MODAL AND RELOAD PROFILE
  const handleProfileUpdate = () => {
    setUpdate(false);
    reloadProfile();
  };

  //CONST CLOSE PASSWORD MODAL AND RELOAD PROFILE
  const handlePasswordUpdate = () => {
    setPassword(false);
    reloadProfile();
  };

  const [users, setUsers] = useState({
    name: "",
    surname: "",
    phone_number: "",
    direction: "",
    birth_date: "",
  });

  //GET YOUR PROFILE
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

  //CONST RELOAD PROFILES FOR MODALS
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
        <Card style={{ width: "21rem" }} className="cardPofile">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span className="profileTextTitle"> Name:</span>
              <span className="profileTextChild"> {users.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="profileTextTitle"> Email: </span>
              <span className="profileTextChild"> {users.email}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="profileTextTitle"> Surname: </span>
              <span className="profileTextChild"> {users.surname}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="profileTextTitle"> Phone Number: </span>
              <span className="profileTextChild"> {users.phone_number}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="profileTextTitle"> Direction: </span>
              <span className="profileTextChild"> {users.direction}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="profileTextTitle"> Birth Date: </span>
              <span className="profileTextChild"> {users.birth_date}</span>
            </ListGroup.Item>
          </ListGroup>
          <div className="buttonModalProfile">
            <Button variant="primary" onClick={handleShowUpdate}>
              Update Profile
            </Button>
            <Modal show={update} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body><ProfileUpdate onProfileUpdate={handleProfileUpdate} /></Modal.Body>
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

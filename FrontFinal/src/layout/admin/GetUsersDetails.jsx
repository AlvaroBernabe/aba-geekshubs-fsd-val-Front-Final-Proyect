import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { detailData } from "../detailSlice";
import { DeleteUser } from "./DeleteUser";
import { ChangeRole } from "./ChangeRole";

export const GetUsersDetails = () => {
    //REDUX USERS DETAILS
  const detailRedux = useSelector(detailData);

    //OPEN OR CLOSE DELETE MODAL
  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

    //OPEN OR CLOSE UPDATE MODAL
  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  return (
    <>
      <Card className="CardUserDetails">
        <ListGroup >
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"><b> Name:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.perfil?.name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"> <b>Surname:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.perfil?.surname}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"><b> Phone Number:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.perfil?.phone_number}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"> <b>Email:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.email}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"> <b>Direction:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.perfil?.direction}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"> <b>Role Id:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.role_id}</span>
          </ListGroup.Item>
          <ListGroup.Item className="CardUserDetailsList">
            <span className="userDetailsTextTitle"> <b>Birth Date:</b></span>
            <span className="userDetailsTextChild"> {detailRedux?.choosenObject?.perfil?.birth_date}</span>
          </ListGroup.Item>

          <div className="ButtonModalGames">
            <Button variant="danger" onClick={handleShowUpdate}>
              Delete User
            </Button>
            <Modal show={update} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>You Sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body><DeleteUser></DeleteUser></Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCloseUpdate}>
                  Nope
                </Button>
              </Modal.Footer>
            </Modal>

            <Button variant="warning" onClick={handleShowRemove}>
              Change Role
            </Button>
            <Modal show={remove} onHide={handleCloseRemove}>
              <Modal.Header closeButton>
                <Modal.Title>Make User an Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body><ChangeRole></ChangeRole></Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCloseRemove}>
                  Nope
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </ListGroup>
      </Card>
    </>
  );
};

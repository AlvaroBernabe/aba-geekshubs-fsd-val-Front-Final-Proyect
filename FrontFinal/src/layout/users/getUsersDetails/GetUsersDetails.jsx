import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { detailData } from "../../detailSlice";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { DeleteUser } from "../getAllUsers/DeleteUser";
import { ChangeRole } from "../getAllUsers/ChangeRole";

export const GetUsersDetails = () => {
  const detailRedux = useSelector(detailData);

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);
  return (
    <>
      <Card className="CardUserDetails">
        <ListGroup>
          <ListGroup.Item>
            <span className="text1"> Name:</span>
            <span className="text2"> {detailRedux?.choosenObject?.perfil?.name}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Surname:</span>
            <span className="text2"> {detailRedux?.choosenObject?.perfil?.surname}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Phone Number:</span>
            <span className="text2"> {detailRedux?.choosenObject?.perfil?.phone_number}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Email:</span>
            <span className="text2"> {detailRedux?.choosenObject?.email}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Direction:</span>
            <span className="text2"> {detailRedux?.choosenObject?.perfil?.direction}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Role Id:</span>
            <span className="text2"> {detailRedux?.choosenObject?.role_id}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="text1"> Birth Date:</span>
            <span className="text2"> {detailRedux?.choosenObject?.perfil?.birth_date}</span>
          </ListGroup.Item>
          
          <div className="ButtonModalGames">
            <Button variant="danger" onClick={handleShowRemove}>
              Delete User
            </Button>
            <Modal show={remove} onHide={handleCloseRemove}>
              <Modal.Header closeButton>
                <Modal.Title>You Sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body><DeleteUser></DeleteUser></Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCloseRemove}>
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

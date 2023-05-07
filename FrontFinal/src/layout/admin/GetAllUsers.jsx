import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Card, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { getAllUsers } from "../services/apiCalls";
import { addChoosen } from "../detailSlice";


export const GetAllUsers = () => {

  const [users, setUsers] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();




  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(ReduxCredentials.credentials?.token)
        .then(
          result => {
            setUsers(result.data.data.resultado)
            console.log(result.data.data.resultado)
          }
        )
        .catch(error => console.log(error));
    }
  }, [users])

  const selected = (persona) => {
    dispatch(addChoosen({ choosenObject: persona }))
    setTimeout(() => {
      navigate("/users/all/details");
    }, 500);
  }

  console.log(users)

  return (
    <>
      <div className='getAllUsers'>
        {users.length > 0 ?
          (<div>
            {
              users.map(
                persona => {
                  return (
                    <div
                      onClick={() => selected(persona)}
                      key={persona.id}>
                      <Row >
                        <Card>
                          <ListGroup className="ListGroupAllUsers" variant="flush">
                            <ListGroup.Item>
                              <span className="text1"> Id:</span>
                              <span className="text2"> {persona.id}</span>
                              <span className="text1"> Role Id:</span>
                              <span className="text2"> {persona.role_id}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text1"> Email:</span>
                              <span className="text2"> {persona.email}</span>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </Row>
                    </div>
                  )
                }
              )
            }
          </div>)
          :
          (<div>ESTAN VINIENDO</div>)
        }
      </div>
    </>
  );
}
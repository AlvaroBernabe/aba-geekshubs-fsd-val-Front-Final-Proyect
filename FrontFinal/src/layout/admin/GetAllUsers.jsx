import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Row } from "react-bootstrap";
import { userData } from "../userSlice";
import { getAllUsers } from "../services/apiCalls";
import { addChoosen } from "../detailSlice";

export const GetAllUsers = () => {

  const [users, setUsers] = useState([]);
  const userRedux = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(userRedux.credentials?.token)
        .then(
          result => {
            setUsers(result.data.data.resultado)
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
                        <Card className='getAllUsersCard'>
                          <ListGroup className="ListGroupAllUsers" variant="flush">
                            <ListGroup.Item>
                              <span className="text1"> <b>Id:</b></span>
                              <span className="text2"> {persona.id}</span>
                              <span className="text1"><b> Role Id:</b></span>
                              <span className="text2"> {persona.role_id}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text1"> <b>Email:</b></span>
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
          (<div>Users are Coming</div>)
        }
      </div>
    </>
  );
}
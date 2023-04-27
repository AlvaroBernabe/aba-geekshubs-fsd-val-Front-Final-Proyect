import React, { useEffect, useState } from "react";
import './GetAllUsers.css';
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addChoosen } from "../../detailSlice";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

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
                      <Card>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <span className="text1"> Email:</span>
                            <span className="text2"> {persona.email}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>

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
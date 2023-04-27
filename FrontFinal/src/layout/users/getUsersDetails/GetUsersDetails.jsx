import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { detailData } from "../../detailSlice";
import { Card, ListGroup } from "react-bootstrap";

export const GetUsersDetails = () => {
  const detailRedux = useSelector(detailData);
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
        </ListGroup>
      </Card>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { detailData } from "../../detailSlice";

export const GetUsersDetails = () => {
  const detailRedux = useSelector(detailData);
  return (
    <>
      <div className="">
        <div className="texto">Name : </div>
        {detailRedux?.choosenObject?.perfil?.name}
        <div className="texto">Surname: </div>
        {detailRedux?.choosenObject?.perfil?.surname}
        <div className="texto">Phone Number: </div>
        {detailRedux?.choosenObject?.perfil?.phone_number}
        <div className="texto">Email: </div>
        {detailRedux?.choosenObject?.email}
        <div className="texto">Direction: </div>
        {detailRedux?.choosenObject?.perfil?.direction}
        <div className="texto">Role Id: </div>
        {detailRedux?.choosenObject?.role_id}
        <div className="texto">Birth Date: </div>
        {detailRedux?.choosenObject?.perfil?.birth_date}
      </div>
    </>
  );
};

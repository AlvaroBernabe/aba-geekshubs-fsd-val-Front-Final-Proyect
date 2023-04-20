import React, { useEffect, useState } from "react";
import { getAllUsersDetails } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import { detailData } from "../../detailSlice";

export const GetUsersDetails = () => {
    
    const ReduxCredentials = useSelector(userData);
    const detailRedux = useSelector(detailData);
    let params = detailRedux.choosenObject.id
    
    const [users, setUsers] = useState({
        id: "",
        name: "",
        surname: "",
        user_id: params,
        direction: "",
        birth_date: "",
});
      const [detailUser, setdetailUser] = useState({
      });



      console.log("Detalles USuario", detailRedux.choosenObject.id)
      console.log("esto se supone qu ees users", users)
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(()=>{
        // console.log("console log de users", users)      // Este saca los el array con los usuarios
        if(users.length === 0){
            getAllUsersDetails(params, ReduxCredentials.credentials?.token)
                .then(
                    result => {
                        setUsers(result.data.data)
                        console.log(result.data.data)

                    }
                )
                .catch(error => console.log(error));
        }
    },[users])

    return (
        <>
        <NavBar />
        <hr />
        {/* <div className='usersDesign'>
            {  users.length > 0 ? 
                (<div>
                    {
                        users.map(
                            persona => {
                                return (
                                    <div 
                                        key={persona.id}>
                                        {persona.email}
                                    </div>
                                )
                            }
                        )
                    }
                </div>)
                : 
                (<div>ESTAN VINIENDO</div>)
            }
         </div> */}
      </>
    );
}
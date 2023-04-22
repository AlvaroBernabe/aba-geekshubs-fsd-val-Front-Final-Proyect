import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../services/apiCalls";
import NavBar from "../../../components/NavBar";
import { userData } from "../../userSlice";

export const GetAllGames = () => {

    const [games, setGames] = useState([]);
      const ReduxCredentials = useSelector(userData);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(()=>{
        // console.log("console log de users", users)      // Este saca los el array con los usuarios
        if(games.length === 0){
            getAllGames(ReduxCredentials.credentials?.token)
                .then(
                    result => {
                        setGames(result.data.data)
                        console.log(result.data.data)
                    }
                )
                .catch(error => console.log(error));
        }
    },[games])

    // const selected = (persona) => {
    //     dispatch(addChoosen({ choosenObject: persona }))
    //     setTimeout(() => {
    //         navigate("/users/all/details");
    //       }, 500);
    // }


    return (
        <>
        <NavBar />
        <hr />
        <div className='usersDesign'>
            {  games.length > 0 ? 
                (<div>
                    {
                        games.map(
                            juego => {
                                return (
                                    <div 
                                        // onClick={()=>selected(juego)} 
                                        key={juego.id}>
                                        {juego.name}
                                        {juego.publisher}
                                    </div>
                                )
                            }
                        )
                    }
                </div>)
                : 
                (<div>Estos Son Todos Los Juegos</div>)
            }
         </div>
      </>
    );
}

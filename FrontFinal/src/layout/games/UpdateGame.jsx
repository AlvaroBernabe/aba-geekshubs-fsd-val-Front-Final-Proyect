import React, { useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { gameUpdate } from "../services/apiCalls";
import NavBar from "../../components/NavBar";
import { Button, Form } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";
import { detailData } from "../detailSlice";
import { useNavigate } from "react-router-dom";

export const UpdateGame = () => {

    const ReduxCredentials = useSelector(userData);
    const ReduxAppointment = useSelector(detailData)
    // console.log(ReduxAppointment.choosenObject.id);

    const navigate = useNavigate();
    const [welcome, setWelcome] = useState("");

    let params = ReduxAppointment.choosenObject.id;


    const [games, setGames] = useState({
        id: params,
        name: '',
        description: '',
        score: '',
        genre: '',
        publisher: '',
        release_date: ''
      });
    
      const inputHandler = (e) => {
        setGames((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    



    // useEffect(()=>{
    //     if (userData.name === ""){
    //       getUserData(ReduxCredentials.credentials.token).then(
    //         resultado => {console.log(resultado)}
    //       ).catch(error => (console.log(error)))
    //     }
    // }, [userData]);

    const checkError = (e) => {

    }

    const updateGames = () => {
      gameUpdate(params, games, ReduxCredentials.credentials.token)
          .then((resultado) => {
            setGames(resultado.data)
            setWelcome(`Correctly updated ${games.name}`);
              setTimeout(() => {
                  navigate("/games/all");
              }, 2000);
          })
          .catch((error) => console.log(error));
  };
  console.log(games, "esto vale juegos");

    return (
        <>
        <NavBar />
        <hr />
        <div style={{ display: 'block', 
                    width: 700, 
                    padding: 30 }}>
        <h4>Update Game</h4>
        <Form>
           <Form.Group>
              <Form.Label>name:</Form.Label>
              <InputText className={"inputLogin"}
              type={"text"} name={"name"} placeholder={ReduxAppointment.choosenObject.name} maxLength={70}
              changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
              </Form.Group>
          <Form.Group>
              <Form.Label>description:</Form.Label>
              <InputText className={"inputLogin"}
                type={"text"} name={"description"} placeholder={ReduxAppointment.choosenObject.description} maxLength={70}
                changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
          </Form.Group>
          <Form.Group>
              <Form.Label>score:</Form.Label>
              <InputText className={"inputLogin"}
              type={"float"} name={"score"} placeholder={ReduxAppointment.choosenObject.score} maxLength={70}
              changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
              </Form.Group>
          <Form.Group>
              <Form.Label>genre:</Form.Label>
              <InputText className={"inputLogin"}
                type={"text"} name={"genre"} placeholder={ReduxAppointment.choosenObject.genre} maxLength={70}
                changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
          </Form.Group>
          <Form.Group>
              <Form.Label>publisher:</Form.Label>
              <InputText className={"inputLogin"}
              type={"text"} name={"publisher"} placeholder={ReduxAppointment.choosenObject.publisher} maxLength={70}
              changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
              </Form.Group>
          <Form.Group>
              <Form.Label>release_date:</Form.Label>
              <InputText className={"inputLogin"}
                type={"date"} name={"release_date"} placeholder={"release_date"} maxLength={70}
                changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
          </Form.Group>
              <br />
              <div className='botonModificar'>
                  <Button variant="primary" onClick={updateGames}>
                      Update Game
                  </Button>
              </div>
          </Form>
        </div>
        </>
    );
}

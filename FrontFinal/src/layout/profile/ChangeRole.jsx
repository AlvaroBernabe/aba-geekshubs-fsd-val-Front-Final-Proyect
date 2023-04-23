import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { changeRole } from "../services/apiCalls";
import NavBar from "../../components/NavBar";
import { Button, Form } from "react-bootstrap";
import { InputText } from "../../components/InputText/InputText";

export const ChangeRole = () => {

    const ReduxCredentials = useSelector(userData);

    const [credenciales, setCredenciales] = useState({
        id: '',
        role_id: ''
      });
    
      const inputHandler = (e) => {
        setCredenciales((prevState) => ({
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

    const changeRol = () => {
      changeRole(credenciales, ReduxCredentials.credentials.token)
          .then((resultado) => {
            setCredenciales(resultado.data)
            //   setTimeout(() => {
            //       navigate("/");
            //   }, 2000);
          })
          .catch((error) => console.log(error));
  };
  console.log(credenciales);

    return (
        <>
        <NavBar />
        <hr />
        <div style={{ display: 'block', 
                    width: 700, 
                    padding: 30 }}>
        <h4>React-Bootstrap Form Component</h4>
        <Form>
           <Form.Group>
              <Form.Label>userid:</Form.Label>
              <InputText className={"inputLogin"}
              type={"number"} name={"id"} placeholder={"id..."} required={true} maxLength={70}
              changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
              </Form.Group>
          <Form.Group>
              <Form.Label>Role Id:</Form.Label>
              <InputText className={"role_id"}
                type={"number"} name={"role_id"} placeholder={"role_id"} required={true} maxLength={70}
                changeFunction={(e) => inputHandler(e)} blurFunction={(e) => checkError(e)} />
          </Form.Group>
              <br />
              <div className='botonModificar'>
                  <Button variant="primary" onClick={changeRol}>
                      Modificar Role
                  </Button>
              </div>
          </Form>
        </div>
        </>
    );
}
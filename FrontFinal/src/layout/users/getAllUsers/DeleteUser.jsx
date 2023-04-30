import React, { useState } from "react";
import { userDelete } from "../../services/apiCalls";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { detailData } from "../../detailSlice";
import { userData } from "../../userSlice";
import { useNavigate } from "react-router-dom";

export const DeleteUser = () => {
    const ReduxCredentials = useSelector(userData);
    const ReduxAppointment = useSelector(detailData);
    const [welcome, setWelcome] = useState("");
    const navigate = useNavigate();

    let params = ReduxAppointment.choosenObject.id;

    const [user, setUser] = useState({
        id: params,
    });

    const UserDelete = async () => {
        userDelete(params, ReduxCredentials.credentials.token)
            .then(() => {
                setWelcome(`Correctly Deleted ${ReduxAppointment.choosenObject.email}`);
                setTimeout(() => {
                    navigate("/users/all/");
                }, 1500);
            })
            .catch((error) => console.log(error));
    };
    // console.log(ReduxAppointment.choosenObject.email, "esto deberia ser id de user a borrar");
    return (
        <>
            <div>
                {welcome !== "" ? (
                    <div className="divWellcome">
                        <Card>
                            <Card.Header>{welcome}</Card.Header>
                        </Card>
                    </div>
                ) : (
                    <div className="botonModificar">
                        <Button variant="Light" onClick={UserDelete}>
                            Delete User Forever
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
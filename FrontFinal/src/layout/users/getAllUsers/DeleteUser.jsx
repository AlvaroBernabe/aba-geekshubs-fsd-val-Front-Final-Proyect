import React from "react";
import { userDelete } from "../../services/apiCalls";

export const DeleteUser = () => {
    const ReduxCredentials = useSelector(userData);
    const ReduxAppointment = useSelector(detailData);
    const [welcome, setWelcome] = useState("");
  
    let params = ReduxAppointment.choosenObject.id;
  
    const [games, setGames] = useState({
      id: params,
    });
  
    const UserDelete = async () => {
      userDelete(params, ReduxCredentials.credentials.token)
        .then(() => {
          setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        })
        .catch((error) => console.log(error));
    };
    console.log(games, "esto deberia ser id de game a borrar");
    return (
      <div className="botonModificar">
        <Button variant="Light" onClick={UserDelete}>
          Delete User Forever
        </Button>
      </div>
    );
  };
  
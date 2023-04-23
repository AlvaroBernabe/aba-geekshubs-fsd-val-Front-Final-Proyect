import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../layout/userSlice";

function NavBar() {
  const credencialesRedux = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userout({ credentials: {}, token: "" }));
    return navigate("/");
  };

  return (
    <div className="navbarstyle">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              {!credencialesRedux.credentials?.usuario?.role_id ? (
                <>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              ) : credencialesRedux?.credentials?.usuario?.role_id === 2 ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    Eres user Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Get My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile/update">
                    Profile Update
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login/update">
                    Update Password
                  </Nav.Link>
                  <Nav.Link as={Link} to="/games/all">
                    Get All Games
                  </Nav.Link>
                  <Nav.Link as={Link} to="/games/favourites">
                    Get Favourites Games
                  </Nav.Link>
                  <Nav.Link as={Link} to="/review/new">
                    New Review
                  </Nav.Link>
                  <Nav.Link as={Link} to="/review/all">
                    All Reviews
                  </Nav.Link>
                </>
              ) : credencialesRedux?.credentials?.usuario?.role_id === 1 ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    Eres Admin Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Get My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile/update">
                    Profile Update
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users/all">
                    Get All Users
                  </Nav.Link>
                  <Nav.Link as={Link} to="/reviews/all">
                    Get All Reviews
                  </Nav.Link>
                  <Nav.Link as={Link} to="/games/new">
                    New Game
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    Eres Nadie
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
      <Navbar className="NavBar" collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
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
                  <NavDropdown title="Profile Update" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/profile/update">
                      Profile Update</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login/update">
                      Update Password</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Get All" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/review/all">
                      Get All Reviews</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gamesUser/all">
                      Get All Games</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/games/favourites">
                    Get Favourites Games
                  </Nav.Link>
                  <Nav.Link as={Link} to="/review/new">
                    New Review
                  </Nav.Link>
                </>
              ) : credencialesRedux?.credentials?.usuario?.role_id === 1 ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    Eres Admin Logout
                  </Nav.Link>
                  <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/profile">
                      Get My Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile/update">
                      Profile Update</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile/update/rol">
                      Role Update</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Get All" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/users/all">
                      Get All Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/reviews/all">
                      Get All Reviews</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/games/all">
                      Get All Games</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/games/new">
                    New Game
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    You Don´t Exist
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/about">
                About Me
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

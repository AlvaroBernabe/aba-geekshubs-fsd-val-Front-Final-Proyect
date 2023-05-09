import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../layout/userSlice";
import { BoxArrowLeft, Trash3Fill } from "react-bootstrap-icons";
import logo from '../assets/images/old-games-green.png'

function NavBar() {
  const userRedux = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //USER LOGOUT
  const logout = () => {
    dispatch(userout({ credentials: {}, token: "" }));
    return navigate("/");
  };

  return (
    <div className="navbarstyle">
      <div className="NavbarLogo">
        <a href="/"><img src={logo} className="imgLogo" /></a>
      </div>
      <Navbar className="NavBar" collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="navBarTextColor">
                Home
              </Nav.Link>
              {!userRedux.credentials?.usuario?.role_id ? (
                <>
                  <Nav.Link as={Link} to="/register" className="navBarTextColor">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="navBarTextColor">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/gamesnonUser/all" className="navBarTextColor">
                    All Games
                  </Nav.Link>
                </>
              ) : userRedux?.credentials?.usuario?.role_id === 2 ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="navBarTextColor">
                    Get My Profile
                  </Nav.Link>
                  <NavDropdown title="Get All" className="navBarTextColor">
                    <NavDropdown.Item as={Link} to="/review/all" className="navBarTextColor">
                      Get Your Reviews</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gamesUser/all" className="navBarTextColor">
                      Get All Games</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/games/favourites" className="navBarTextColor">
                    Get Favourites Games
                  </Nav.Link>
                  <Nav.Link as={Link} to="/review/new" className="navBarTextColor">
                    New Review
                  </Nav.Link>
                </>
              ) : userRedux?.credentials?.usuario?.role_id === 1 ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="navBarTextColor">
                    Get My Profile
                  </Nav.Link>
                  <NavDropdown title="Get All" id="basic-nav-dropdown" className="navBarTextColor">
                    <NavDropdown.Item as={Link} to="/users/all" className="navBarTextColor">
                      Get All Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/reviews/all" className="navBarTextColor">
                      Get All Reviews</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/games/all" className="navBarTextColor">
                      Get All Games</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/news/all/admin" className="navBarTextColor">
                      Get All News</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="New" id="basic-nav-dropdown" className="navBarTextColor">
                    <NavDropdown.Item as={Link} to="/games/new" className="navBarTextColor">
                      New Game</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/news/new" className="navBarTextColor">
                      New News</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => logout()}>
                    You Don´t Exist
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/news/all" className="navBarTextColor">
                News
              </Nav.Link>
              {userRedux?.credentials && userRedux?.credentials?.usuario?.role_id > 0 && (
                <Nav.Link as={Link} to="/" onClick={() => logout()}>
                  <BoxArrowLeft />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

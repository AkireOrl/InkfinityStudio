import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  console.log(userRdxData, "soy redux data en header");

  const token = userRdxData.credentials 
  ? 
  userRdxData.credentials.token 
  : null;
  console.log(token, "soy log en linea 17 de header")
  const decoded = userRdxData.credentials 
  ? 
  userRdxData.credentials.userData 
  : null;
  //   const token = 3
  // const decoded = 4



  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));
    setTimeout(() => {
      navigate()
    });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body" id="navbar">
      <Container>
        <Navbar.Brand href="">Inkfinity Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="white-navbar-nav text-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="tatuadores">Tatuadores</Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">Resgistrarse</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="">Mis no-citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
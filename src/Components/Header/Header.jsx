import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { logout, userData } from "../../pages/userSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const { credentials } = useSelector((state) => state.user);
 // console.log(userRdxData, "soy redux data en header");

  // const token = userRdxData.credentials 
  // ? 
  // userRdxData.credentials.token 
  // : null;
  // // console.log(token, "soy log en linea 21 de header")
  // const decoded = userRdxData.credentials 
  // ? 
  // userRdxData.credentials.userData 
  // : null;
  // //   const token = 3
  // const decoded = 4

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData
  // const token = useSelector((state) => state.login.token);
  // const decoded = useSelector((state) => state.login.userData);

  console.log(decoded)

  const logMeOut = () => {
    dispatch(logout({ credentials: { token: null, userData: null}}));
    setTimeout(() => {
      navigate('/')
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
              ) :  decoded.userRoles[0] === "admin" ? (
                <>
                  <NavDropdown.Item href="tatuprofile">TatuPerfil</NavDropdown.Item>
                  <NavDropdown.Item href="">Mis cosas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              ): (
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
import { useEffect, useState } from "react";
import "./Login.css";
import { InputLogin } from "../../Components/InputLogin/inputLogin";
import { userLogin } from "../../Services/ApiCalls";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const inputHandler = (event) => {
        setCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const buttonHandler = async () => {
        try {
          const token = await userLogin(credentials)
          const decodedToken = jwtDecode(token);
          localStorage.setItem('token', token);
          localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        } catch (error) {
          // Maneja los errores de autenticación aquí (puedes mostrar un mensaje al usuario, etc.)
          console.error('Error en el login:', error);
        }
      };

    // useEffect(() => {
    //     if (!token){
    //         navigate("/register")
    // } else {
    //         navigate('/profile')
    //   }});


    // useEffect(() => {
    //     // console.table(userData)
    // }, [userData]);

    return (
        <div className="login">
        <div className="loginDiv">
            <div className="input">
                <div className="inputBox">

                    <label>EMAIL</label>
                    <InputLogin
                        type={"email"}
                        name={"email"}
                        handler={inputHandler}
                    ></InputLogin>
                    <label>CONTRASEÑA</label>
                    <InputLogin
                        type={"password"}
                        name={"password"}
                        handler={inputHandler}
                    ></InputLogin>
                    <input type="submit" name="" onClick={buttonHandler} value="Entrar"></input>
                    {/* <h1>{userData.name}</h1> */}
                </div>
            </div>
            
        </div>
        </div>
    );
};
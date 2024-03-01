import { useEffect, useState } from "react";
import "./Register.css";
import { InputLogin } from "../../Components/InputLogin/InputLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser, userLogin } from "../../Services/ApiCalls";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";



export const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });
    

    const inputHandler = (event) => {
        setRegisterData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    // instancio redux en modo escritura
    const dispatch = useDispatch()
    // // instancio redux en modo lectura
    const userRdxData = useSelector(userData);

    const navigate = useNavigate();

    const buttonHandler = () => {
        //definimos las credenciales para el futuro login con los datos de registro
        const credentials = {
          email: registerData.email,
          password: registerData.password,
        };
        createNewUser(registerData)
        .then(() =>{
     
            userLogin(credentials)
            .then((token) =>{
              if(!token){
                  navigate("/login");
                  return null;
                  }
              const decodedToken = jwtDecode(token)
      
              const data = {
                  token: token,
                  userData: decodedToken
              }
              dispatch(login({credentials: data}))
                  setTimeout(() => {
                    navigate('/profile')
                  });
                
            })
            .catch((err) => console.error("Ha ocurrido un error", err))
          });
        }
  


    return (
        <div className="login">
            <div className="loginDiv">
                <div className="input">
                    <div className="inputBox">
                        <label>NOMBRE</label>
                        <InputLogin
                            type={"text"}
                            name={"username"}
                            handler={inputHandler}
                        ></InputLogin>

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
                        <input type="submit" name="" onClick={buttonHandler} value="Registrarse"></input>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

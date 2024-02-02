import { useEffect, useState } from "react";
import "./Login.css";
import { InputLogin } from "../../Components/InputLogin/inputLogin";
import { userLogin } from "../../Services/ApiCalls";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });



    const inputHandler = (event) => {
        setCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };



    const buttonHandler = () => {
        if (credentials.password !="" &&
        credentials.email != ""){
        userLogin(credentials).then((token) => {
            //console.log(credentials)
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            localStorage.setItem('token', token);
            localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
            setTimeout(() => { navigate('/profile') }, 1000)

        })
        .catch((errorMessage)=>{alert("Wrong username or password")})} 
        
    };




        let token = localStorage.getItem("token");
        useEffect(() => {
            let token = localStorage.getItem("token");
            if (!token) {
               // navigate('/register')
            } else {
                navigate('/profile')
            }
        }, []);



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
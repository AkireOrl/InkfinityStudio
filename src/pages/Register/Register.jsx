import { useEffect, useState } from "react";
import "./Register.css";
import { InputLogin } from "../../Components/InputLogin/inputLogin";
import { bringAllCharacters } from "../../Services/ApiCalls";


export const Register = () => {
    const [characters, setCharacters] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const buttonHandler = () => {
        bringAllCharacters().then((characters) => {
            setCharacters(characters);
        });
    };

    useEffect(() => {
        console.log(characters);
    }, [characters]);

    useEffect(() => {
        // console.table(userData)
    }, [userData]);

    return (
        <div className="login">
            <div className="loginDiv">
                <div className="input">
                    <div class="inputBox">
                        <label>NOMBRE</label>
                        <InputLogin
                            type={"text"}
                            name={"name"}
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
                        <input type="submit" name="" value="Registrarse"></input>
                        <h1>{userData.name}</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};
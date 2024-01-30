import { useEffect, useState } from "react"
import { ArtistCard } from "../../Components/ArtistCard/ArtistCard";
import { bringAllCharacters } from "../../Services/ApiCalls";
import "./Tatuadores.css"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Tatuadores = () => {

    const [characters, setCharacters] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate()
    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

    const buttonHandler = () => {
        // if (contraseña correcta) ...
        let personajeSeleccionado = {}
        characters.forEach((char) => {
            if (inputValue === char.name) {
                personajeSeleccionado = char
                console.log(char)
                localStorage.setItem('details', JSON.stringify(char))
                navigate('/characterdetail')
            }
        })
    };

    const loginHandler = (id) => {
        // const token = userLogin(id)
        // const decodedToken = jwtDecode(token)
        // localStorage.setItem('token', token)
        // localStorage.setItem('decoded', JSON.stringify(decodedToken))

        // console.log(token, 'aquí yace TOKEN')
        // console.log(decodedToken, 'esto es decoded token')
        console.log(id)
    }

    useEffect(() => {
        if (characters.length === 0) {
            bringAllCharacters().then((chars) => {
                setCharacters(chars);
            });
        }
    }, [characters]);

    //   useEffect(() => {
    //     characters.forEach((char) => {
    //         if (inputValue === char.name) {
    //             console.log(char)

    //         }
    //     })
    //   }, [inputValue])



    // const buttonHandler = () => {
    //     bringAllCharacters().then((res) => {
    //         console.log(res)
    //     })
    // }

    return (
        <>

            <div className="topTatu">
                <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
            </div>

            <div className="apiCallButton" onClick={buttonHandler}></div>
            
           
                <div className="characterContainer">
                    {characters.length > 0 ? (
                        <>
                            {characters.map((char) => {
                                return (
                                    <ArtistCard
                                        id={char.id}
                                        image={char.image}
                                        name={char.name}
                                    ></ArtistCard>
                                );
                            })}
                        </>
                    ) : null}
                </div>
            
        </>
    )


}
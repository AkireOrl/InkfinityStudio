

import { useEffect, useState } from "react"
import { ArtistCard } from "../../Components/ArtistCard/ArtistCard";
import { bringAllArtist } from "../../Services/ApiCalls";
import "./Tatuadores.css"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Tatuadores = () => {

    const [artists, setArtists] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate()
    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

    const buttonHandler = () => {
        // if (contraseña correcta) ...
        let personajeSeleccionado = {}
        artists.forEach((artist) => {
            if (inputValue === artist.name) {
                personajeSeleccionado = artist
                console.log(artist)
                localStorage.setItem('details', JSON.stringify(artist))
                navigate('/characterdetail')
            }
        })
    };



    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtist().then((arts) => {
                setArtists(arts);
            });
        }
        // console.log(artists, "soy console de artists, a ver si salgo");
    }, []);

    return (
        <>

            <div className="topTatu">
                <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
            </div>

            <div className="apiCallButton" onClick={buttonHandler}></div>
            <div className=" container-fluid col-9">
                <div className="artistContainer">

                    {artists && artists.userArtistIds && artists.userArtistIds.length > 0 ? (
                        artists.userArtistIds.map((artist) => {
                            return (
                                <ArtistCard
                                    key={artist.id}
                                    name={artist.name}
                                    photo={artist.photo}
                                />
                            );
                        })
                    ) : (
                        <p>No hay artistas para mostrar.</p>
                    )}
                </div>
            </div>

        </>
    )


}
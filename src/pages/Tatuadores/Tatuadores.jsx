import { useEffect, useState } from "react"
import { ArtistCard } from "../../Components/ArtistCard/ArtistCard";
import { bringAllArtist } from "../../Services/ApiCalls";
import "./Tatuadores.css"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Tatuadores = () => {

    const [artists, setArtists] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [artistSelect, setArtistSelect]  = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtist().then((arts) => {
                setArtists(arts.userArtistIds); 
            });
        }
        // console.log(artists, "soy console de artists, a ver si salgo");
    }, []);

    console.log( artists, "soy console de artists, a ver si salgo");
    const buttonHandler = () => {
        // if (contraseña correcta) ...
        const personajeSeleccionado = artists.find((artist) => parseInt(inputValue) === artist.id);
        // If a matching artist is found, navigate to the new page
        if (personajeSeleccionado) {
            console.log(personajeSeleccionado);
            // navigate(`/artist/${personajeSeleccionado.id}`);
        }
    };

 


   
    return (
        <>

            <div className="topTatu">
                <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
            </div>

            <div className="apiCallButton">
                <div className=" container-fluid col-9">
                    <div className="artistContainer">

                    {artists && artists.length > 0 ? (
                            artists.map((artist, index) => {
                                return (
                                    <ArtistCard
                                        key={index}
                                        id={artist.id}
                                        name={artist.name}
                                        photo={artist.photo}
                                        //  handler={buttonHandler}
                                    />
                                );
                            })
                        ) : (
                            <p>No hay artistas para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )


}
import { useEffect, useState } from "react"
import { ArtistCard } from "../../Components/ArtistCard/ArtistCard";
import { bringAllArtist, createAppointments } from "../../Services/ApiCalls";
import "./Tatuadores.css"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Tatuadores = () => {
    const userRdxDetail = useSelector(userData)
    const token = userRdxDetail.credentials.token;
    const [artists, setArtists] = useState([]);
    // const [inputValue, setInputValue] = useState('');
    const [artistSelect, setArtistSelect] = useState({ id: null });
    const [showForm, setShowForm] = useState(false);
    

    const navigate = useNavigate();

    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtist().then((arts) => {
                setArtists(arts.userArtistIds);
            });
        }
        //console.log(artists, "soy console de artists, a ver si salgo");
    }, []);



    const handlerSelect = (id) => {
        const selectedArtist = artists.find((artist) => parseInt(artist.id) === id);
        if (selectedArtist) {
            setArtistSelect(selectedArtist);
            setShowForm(true);
            console.log(selectedArtist);
        } else {
            console.error('Artist not found');
        }
    };


    const isLoggedIn = () => {
        if (token) {
            try {
                let decodeToken = jwtDecode(token);
               // console.log(decodeToken);
                return decodeToken;
            } catch (error) {
                console.log("no sé que mierdas estoy haciendo")
            }
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let decodeToken = jwtDecode(token);
        console.log(artistSelect)
        // const { userId, artistId, date, time } = e.target;
        const appointmentData = {
            user_id: decodeToken.userId,
            artist_id: artistSelect.id,
            date: e.target.elements.date.value,
            hour: e.target.elements.time.value,
        };
        
        try {
            await createAppointments(token, appointmentData);
            navigate("/profile");
        } catch (error) {
            console.error("Error creating appointment: ", error);
        }
    };




    return (
        <>

            <div className="topTatu">
                <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
            </div>

            <div className="allBody">
                <div className=" container-fluid col-9">
                    <div className="artistContainer">

                        {artists && artists.length > 0 ? (
                            artists.map((artist, index) => {
                                return (
                                    <div key={index}>
                                        <ArtistCard

                                            id={artist.id}
                                            name={artist.name}
                                            photo={artist.photo}
                                        // handler={() => handlerSelect(artist.id)}
                                        />
                                        {isLoggedIn() && <button className="mybutton" onClick={() => handlerSelect(artist.id)}>Pedir Cita</button>}
                                        {showForm && (
                                            <form onSubmit={handleSubmit}  className="appointmentForm"  >

                                                <label htmlFor="date"></label>
                                                <input type="date" id="date" name="date" required />

                                                <label htmlFor="time"></label>
                                                <input type="time" id="time" name="time" required />

                                                <button type="submit">Enviar</button>
                                            </form>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No hay artistas para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>

        </>
    );



}
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
    const [artistSelect, setArtistSelect] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
  const userRol = userRdxDetail.credentials.userData?.userRoles[0];



    const navigate = useNavigate();

    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtist().then((arts) => {
                setArtists(arts.userArtistIds);
            });
        }
        
    }, []);



    const handlerSelect = (id) => {
        const selectedArtist = artists.find((artist) => parseInt(artist.id) === id);
        if (selectedArtist) {
            setArtistSelect(selectedArtist);
            setShowForm(true);
            
        } else {
            console.error('Artist not found');
        }
    };


    const isLoggedIn = () => {
        if (token) {
            try {
                let decodeToken = jwtDecode(token);
          
                return decodeToken;
            } catch (error) {
                console.error('No estas registrado');
            }
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let decodeToken = jwtDecode(token);
    
    
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
                                        
                                        {isLoggedIn() && userRol === "user"  &&<button className="mybutton" onClick={() => handlerSelect(artist.id)}>Pedir Cita</button>}
                                        
                                        {showForm && artistSelect && artistSelect.id === artist.id && (
                                            <form onSubmit={handleSubmit}  className="appointmentForm"  >

                                                <label htmlFor="date"></label>
                                                <input className="inputsAppo" type="date" id="date" name="date" min={new Date()} required />

                                                <label htmlFor="time"></label>
                                                <input className="inputsAppo" type="time" id="time" name="time" required />

                                                <button type="submit" className="mybutton">Enviar</button>
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
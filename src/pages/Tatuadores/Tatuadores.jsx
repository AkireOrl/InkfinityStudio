// import { useEffect, useState } from "react"
// import { ArtistCard } from "../../Components/ArtistCard/ArtistCard";
// import { bringAllArtist } from "../../Services/ApiCalls";
// import "./Tatuadores.css"
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const Tatuadores = () => {

//     const [artists, setArtists] = useState([]);
//     const [inputValue, setInputValue] = useState('');

//     const navigate = useNavigate()
//     const inputHandler = (e) => {
//         setInputValue(e.target.value)
//     }

//     const buttonHandler = () => {
//         // if (contraseña correcta) ...
//         let personajeSeleccionado = {}
//         characters.forEach((char) => {
//             if (inputValue === char.name) {
//                 personajeSeleccionado = char
//                 console.log(char)
//                 localStorage.setItem('details', JSON.stringify(char))
//                 navigate('/characterdetail')
//             }
//         })
//     };

//     const loginHandler = (id) => {
//         // const token = userLogin(id)
//         // const decodedToken = jwtDecode(token)
//         // localStorage.setItem('token', token)
//         // localStorage.setItem('decoded', JSON.stringify(decodedToken))

//         // console.log(token, 'aquí yace TOKEN')
//         // console.log(decodedToken, 'esto es decoded token')
//         console.log(id)
//     }



//     //   useEffect(() => {
//     //     characters.forEach((char) => {
//     //         if (inputValue === char.name) {
//     //             console.log(char)

//     //         }
//     //     })
//     //   }, [inputValue])



//     // const buttonHandler = () => {
//     //     bringAllCharacters().then((res) => {
//     //         console.log(res)
//     //     })
//     // }
//     useEffect(() => {
//         if (artists.length === 0) {
//             bringAllArtist().then((arts) => {
//                 setArtists(arts);
//             });
//         }
//         console.log(artists, "soy console de artistas, a ver si salgo");
//     }, [artists]);

//     return (
//         <>

//             <div className="topTatu">
//                 <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
//             </div>

//             <div className="apiCallButton" onClick={buttonHandler}></div>


//                 <div className="artistContainer">
//                     {artists.useArtistsIds.length > 0 ? (
//                         <>
//                             {artists.map((arts) => {
//                                 return (
//                                     <ArtistCard
//                                         id={arts.id}
//                                         photo={arts.photo}
//                                         name={arts.name}
//                                     ></ArtistCard>
//                                 );
//                             })}
//                         </>
//                     ) : null}
//                 </div>

//         </>
//     )


// }

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
        if (artists.length === 0) {
            bringAllArtist().then((arts) => {
                setArtists(arts);
            });
        }
        console.log(artists, "soy console de artists, a ver si salgo");
    }, [artists]);

    return (
        <>

            <div className="topTatu">
                <h1 className="tituloTatus">Conoce a <br />nuestro equipo</h1>
            </div>

            <div className="apiCallButton" onClick={buttonHandler}></div>

            <div className="artistContainer">
                {artists.userArtistIds.length > 0 && (
                    <>
                        {artists.userArtistIds.map((artist) => {
                            return (
                                <ArtistCard
                                    key={artist.id}                
                                    name={artist.name}                                   
                                    photo={artist.photo}
                                />
                            );
                        })}
                    </>
                )}
            </div>

        </>
    )


}
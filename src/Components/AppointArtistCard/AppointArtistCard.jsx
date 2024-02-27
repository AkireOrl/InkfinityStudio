import "./AppointArtistCard.css"
export const AppointArtistCard = ({ date, hour, artistName, user, handler}) => {

 
  return (
    <div className="AppointArtistCard">
      
      <h3>{artistName}</h3>
      <h3>{user}</h3>
      <p>{date}</p>
      <p>{hour}</p>
      <button onClick={handler} className="miBoton"> Editar</button>
      

    </div>
  );
};

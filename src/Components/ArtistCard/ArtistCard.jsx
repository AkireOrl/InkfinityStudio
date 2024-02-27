
import "./ArtistCard.css"
export const ArtistCard = ({index, id, photo, name, handler}) => {


    return (
      
        <div className="artist-card" key={index} onClick={() => handler()}>
        <div className="card-content">
          <img className="artist-img" src={photo}></img>
          <h3 className="artist-name">{name}</h3>
        </div>
      </div>

    );
}

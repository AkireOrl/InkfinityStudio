
import "./ArtistCard.css"
export const ArtistCard = ({id, photo, name}) => {


    return (
      
        <div className="artist-card" key={id}>
        <div className="card-content">
          <img className="artist-img" src={photo}></img>
          <h3 id="artist-name">{name}</h3>
        </div>
      </div>

    );
}

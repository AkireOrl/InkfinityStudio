
import "./ArtistCard.css"
export const ArtistCard = ({index, id, photo, name, handler, children}) => {


    return (
      
        <div className="artist-card" key={index}>
        <div className="card-content">
          <img className="artist-img" src={photo}></img>
          <h3 className="artist-name">{name}</h3>
          {children}
        </div>
      </div>

    );
}
// onClick={() => handler(id)}
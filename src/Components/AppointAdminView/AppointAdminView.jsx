
import "./AppointAdminView.css";
import moment from "moment/moment";
export const AppointsAdmin = ({ id, name, date, hour, artistName }) => {
    return (
      <div className="artist-card" key={id}>
        <div className="card-content">
          <h3 className="artist-name">{artistName}</h3>
          <h4 className="date">{moment(date).format("DD-MM-YYYY")}</h4>
          <h4 className="hour">{hour}</h4>
          <h4 className="username">{name}</h4>
        </div>
      </div>
    );
  };
  
 
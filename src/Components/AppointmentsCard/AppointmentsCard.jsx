
import "./AppointmentsCard.css"
export const AppointmentCard = ({ date, hour, artistName, user, id }) => {
  return (
    <div className="AppointmentCard">
      
      <h3>{artistName}</h3>
      <h3>{user}</h3>
      <p>{date}</p>
      <p>{hour}</p>
      
    </div>
  );
};
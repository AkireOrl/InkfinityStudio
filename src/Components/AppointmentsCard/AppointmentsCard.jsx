
import "./AppointmentsCard.css"
export const AppointmentCard = ({ date, hour, artistName }) => {
  return (
    <div className="AppointmentCard">
      <h3>{artistName}</h3>
      <p>{date}</p>
      <p>{hour}</p>
      
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { getAllAppointments, updateAppointment } from "../../Services/ApiCalls";
import { AppointsAdmin } from "../../Components/AppointAdminView/AppointAdminView";
import "../../Components/AppointAdminView/AppointAdminView.css";



export const SuperAppoint = () => {

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decodedToken = jwtDecode(token);
    const decoded = userRdxData.credentials.userData;
    const userRoles = decodedToken.userRoles;
    //console.log(userRoles, "Soy Role en superCitas")

    const [citas, setCitas] = useState([]);

    useEffect(() => {
        if(token && userRoles[0] !== "super_admin"){
            navigate("/");
                
              
        } else {
            getAllAppointments(token)
            .then((res) => {
                setCitas(res)
                console.log(res, "soy citas en funcion");
        })
    }
    
    }, []);
//-----------------------------------------------------------------------------------------


return(

  <>
  <div className="topTatu">
    <h1 className="tituloTatus">Todas las<br />citas</h1>
  </div>

  <div className="appointmentsUserContainer">
    {citas.artistProfiles &&
      citas.artistProfiles.map((artistProfiles) => (
        <div key={artistProfiles.id}>
          <h2>{artistProfiles.artistName}</h2>
          {artistProfiles.artistAppointments &&
            artistProfiles.artistAppointments.map((appointment) => (
              <AppointsAdmin
                key={appointment.id}
                photo={appointment.user.photo}
                date={appointment.date}
                hour={appointment.hour}
                name={appointment.user.username}
           
              />
              
            ))}
            
        </div>
      ))}
        
  </div>
 
</>
);
};

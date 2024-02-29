
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { deleteAppointments, getAllAppointments, updateAppointment } from "../../Services/ApiCalls";
import { AppointsAdmin } from "../../Components/AppointAdminView/AppointAdminView";
import "../../Components/AppointAdminView/AppointAdminView.css";
import { Col, Row } from "react-bootstrap";



export const SuperAppoint = () => {

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decodedToken = jwtDecode(token);
    const decoded = userRdxData.credentials.userData;
    const userRoles = decodedToken.userRoles;
    //console.log(userRoles, "Soy Role en superCitas")

    const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

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
    const handleDelete = (id) => {
      // console.log("soy la papelera")
      console.log(id)
      deleteAppointment(id, token);
      setDeleteAppointmentId({id});
     
      
    };

    const deleteAppointment = async (id) => {
      try {
        if (deleteAppointmentId !== null && deleteAppointmentId.id === id) {
          await deleteAppointments(id, token).then((res)=> {
            getAllAppointments(token)
            .then((res) => {
                setCitas(res)
                console.log(res, "soy citas en funcion");
            })
          });
          setDeleteAppointmentId(null);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    useEffect(() => {
      if (deleteAppointmentId !== null) {
        deleteAppointment(deleteAppointmentId.id);
      }
    }, [setCitas]);
//-----------------------------------------------------------------------------------------


return(

  <>
  <div className="topTatu">
    <h1 className="tituloTatus">Todas las<br />citas</h1>
  </div>

  <div className="appointmentsUserContainer col-9">
    <Row>
    {citas.artistProfiles &&
      citas.artistProfiles.map((artistProfiles) => (
        <Col key={artistProfiles.id} md={6} className="mb-4">
          <h2>{artistProfiles.artistName}</h2>
          {artistProfiles.artistAppointments &&
            artistProfiles.artistAppointments.map((appointment) => (
              <AppointsAdmin
                key={appointment.id}
                photo={appointment.user.photo}
                date={appointment.date}
                hour={appointment.hour}
                name={appointment.user.username}
                onDelete={() => handleDelete(appointment.id)}
           
              />
              
            ))}
         
            </Col>
      ))}
     </Row>  
  </div>
 
</>
);
};

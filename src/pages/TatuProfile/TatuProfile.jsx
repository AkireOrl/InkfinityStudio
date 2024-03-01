
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAppointments, getArtistById, updateAppointment, updateUser } from "../../Services/ApiCalls.jsx";
import { InputLogin } from "../../Components/InputLogin/InputLogin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData, userData } from "../userSlice.js";
import moment from "moment";
import { AppointArtistCard } from "../../Components/AppointArtistCard/AppointArtistCard.jsx";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "../Profile/Profile.css";
export const TatuProfile = () => {
  const userRdxDetail = useSelector(userData)
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const token = userRdxDetail.credentials.token;
  const dispatch = useDispatch();
  const [editableProfileData, setEditableProfileData] = useState({});
  const [editableAppointment, setEditableAppointment] = useState(null);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/register");
      } else {
        const res = await getArtistById(token);
        setProfileData(res);

        // Logica para determinar qué entra en el seteditableprofiledata
        setEditableProfileData({
          username: res.profileUser?.username,
          name: res.profileUser?.name,
          surname: res.profileUser?.surname,
          photo: res.profileUser?.photo,
          portfolio: res.profileUser?.portfolio,
        });
      }
    };

    fetchData();
  }, [token, navigate]);

  const inputHandler = (event) => {
    if (editableAppointment) {
      setEditableAppointment((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      setEditableProfileData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    // Si se sale del modo de edición, limpiamos la cita editable
    if (!isEditing) {
      setEditableAppointment(null);
    }
  };

  const handleAppointmentClick = (appointment) => {
    setEditableAppointment(appointment);
    setIsEditable(true);
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setEditableAppointment(null);
  };

  
  const handleDelete = (id) => {
    setDeleteAppointmentId({id});
   
  };

  const saveChanges = async () => {
    if (editableProfileData) {
      // Actualizar el perfil del usuario en la base de datos
      const updatedData = {
        name: editableProfileData.name,
        username: editableProfileData.username,
        surname: editableProfileData.surname,
        photo: editableProfileData.photo,
        portfolio: editableProfileData.portfolio,
      };

      if (token) {
        try {
          await updateUser(token, updatedData);
          setProfileData((prevState) => ({
            ...prevState,
            profileUser: {
              ...prevState.profileUser,
              ...updatedData,
            },
          }));
          setIsEditing(false);
          window.location.reload(); // Recargar la página después de guardar el nuevo appointment
        } catch (error) {
          console.error("Error al actualizar el usuario: ", error.response);
        }
      } else {
        console.error("Algo falla en función de guardar");
      }
    } else {
      console.error("UserData is undefined");
    }
  };

  const saveAppointmentChanges = async () => {
    try {
      if (editableAppointment) {
        // Formatear la fecha en el formato deseado (por ejemplo, ISO 8601)
        // const formattedDate = moment(editableAppointment.date, "DD-MM-YYYY").format("YYYY-MM-DD");

        // Construir el objeto con los datos actualizados de la cita
        const updatedData = {
          // date: formattedDate,
          date: editableAppointment.date,
          hour: editableAppointment.hour,
          // Otros datos que necesitas actualizar
        };
        // Llamar a la función de actualización en el servicio
        await updateAppointment(editableAppointment.id, updatedData, token);

        // Actualizar el estado local
        setProfileData((prevState) => ({
          ...prevState,
          artistProfile: {
            ...prevState.artistProfile,
            appointments: prevState.artistProfile.appointments.map((appointment) => {
              if (appointment.id === editableAppointment.id) {
                return { ...appointment, ...updatedData };
              }
              return appointment;
            }),
          },
        }));

        // Desactivar el modo de edición
        setIsEditable(false);
        setEditableAppointment(null);
      } else {
        console.error('No hay cita editable');
      }
    } catch (error) {
      console.error('Error al guardar cambios de la cita:', error);
    }
  };


  
  const deleteAppointment = async (id) => {
    try {
      if (deleteAppointmentId !== null && deleteAppointmentId.id === id) {
        
        await deleteAppointments(id, token);
     
        setProfileData((prevState) => ({
          ...prevState,
          artistProfile: {
            ...prevState.artistProfile,
            appointments: prevState.artistProfile.appointments.filter(
              (appointment) => appointment.id !== id,
            ),
          },
        }));
  
        setDeleteAppointmentId(null);
      } else {
        throw new Error("No hay una cita seleccionada para eliminar");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    if (deleteAppointmentId !== null) {
      deleteAppointment(deleteAppointmentId.id);
    }
  }, [deleteAppointmentId]);
  


  return (
    <>
      <div className="profileDesign">
        <div className="userInfo">
          <img src={profileData.artistProfile?.photo} alt="User" />
          <h1 className="">{profileData.artistProfile?.username}</h1>
          <button onClick={() => buttonHandler()} className="miBoton">
            {isEditing ? "Cerrar edición" : "Editar perfil"}
          </button>
        </div>
        <div className="updateData">
          {isEditing ? (
            <>
              <InputLogin
                name="name"
                type="text"
                handler={inputHandler}
                value={editableProfileData.name}
                placeholder="Nombre"
              />
              <InputLogin
                name="surname"
                type="text"
                handler={inputHandler}
                value={editableProfileData.surname}
                placeholder="Apellido"
              />
              <InputLogin
                name="email"
                type="email"
                handler={inputHandler}
                value={editableProfileData.email}
                placeholder="Email"
              />
              <InputLogin
                name="photo"
                type="text"
                handler={inputHandler}
                value={editableProfileData.photo}
                placeholder="Cambia tu foto"
              />
              <InputLogin
                name="portfolio"
                type="text"
                handler={inputHandler}
                value={editableProfileData.portfolio}
                placeholder="Cambia tu estilo"
              />
            </>
          ) : null}
        </div>

        {isEditing ? (
          <button onClick={saveChanges} className="miBoton">
            Guardar cambios
          </button>
        ) : null}

        <h2>{profileData.artistProfile?.name}</h2>
        <h2>{profileData.artistProfile?.surname}</h2>
        <p>{profileData.artistProfile?.email}</p>



        {profileData.artistProfile?.appointments?.length > 0 && (
          <Container className="mt-5">
            <h3 className="text-center mb-4">Mi agenda de citas</h3>
            <Row xs={1} md={2} lg={3} className="g-4 mb-5">
              {profileData.artistProfile?.appointments?.map((appointment, index) => (
                <Col key={index} className="p-3 d-flex flex-column align-items-center justify-content-between">

                  <Card.Body className="AppointArtistCard">
                 
                    <Card.Title>{appointment.user}</Card.Title>
                    <Card.Text>
                      <span className="font-weight-bold"></span>{" "}
                      {isEditable && editableAppointment && editableAppointment.id === appointment.id ? (
                        <>
                          <Form.Control
                            type="date"
                            value={moment(editableAppointment.date).format("YYYY-MM-DD")}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditableAppointment((prevAppointment) => ({
                                ...prevAppointment,
                                date: value
                              }));
                            }}
                          />

                        </>
                      ) : (
                        moment(appointment.date).format("DD-MM-YYYY")
                      )}
                      <br />
                      <span className="font-weight-bold"></span>{" "}
                      {isEditable && editableAppointment && editableAppointment.id === appointment.id ? (
                        <Form.Control
                          type="time"
                          value={editableAppointment.hour}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEditableAppointment((prevAppointment) => ({
                              ...prevAppointment,
                              hour: value
                            }));
                          }}
                        />
                      ) : (
                        appointment.hour
                      )}
                    </Card.Text>
                    <Button
                      className="miBoton"
                      onClick={() => {
                        if (isEditable && editableAppointment && editableAppointment.id === appointment.id) {
                          saveAppointmentChanges();
                        } else {
                          handleAppointmentClick(appointment);
                        }
                      }}
                    >
                      {isEditable && editableAppointment && editableAppointment.id === appointment.id
                        ? "Guardar"
                        : "Editar"}
                    </Button>
                    {isEditable && editableAppointment && editableAppointment.id === appointment.id ?
                    <Button
                      className="miBoton"
                      onClick={() => handleCancelEdit(appointment.id)}
                    >
                      Cancelar
                    </Button>
              : null}
                    <div className="iconTrash mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"  onClickCapture={() => handleDelete(appointment.id)}>
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                    </div>
                  </Card.Body>

                </Col>
              ))}
            </Row>
          </Container>
        )}

      </div>
    </>
  );
};





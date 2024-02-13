import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile/Profile.css";
import { getArtistById, getProfile, updateUser } from "../../Services/ApiCalls.jsx";
import { InputLogin } from "../../Components/InputLogin/InputLogin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData, userData } from "../userSlice.js";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { AppointmentCard } from "../../Components/AppointmentsCard/AppointmentsCard.jsx";



export const TatuProfile = () => {
  const userRdxDetail = useSelector(userData)
  // console.log(userRdxDetail, "En profile")
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  // console.log(profileData, "Linea de arriba qu eno es la 50")
  const [isEditing, setIsEditing] = useState(false);
  const token = userRdxDetail.credentials.token
  const decodedToken = jwtDecode(token)
  // console.log(token, "Token en Profile");
  const userId = decodedToken.userId
  console.log(userId);
  const dispatch = useDispatch();
  const [editableProfileData, setEditableProfileData] = useState({});
  // console.log(editableProfileData, "input data");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/register");
      } else  {
        const res = await getArtistById(token);
        setProfileData(res);

        //logica para determinar que entra en el seteditableprofiledata
        setEditableProfileData({
          username: res.profileUser?.username,
          name: res.profileUser?.name,
          surname: res.profileUser?.surname,
          photo: res.profileUser?.photo
          
        });
        
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    console.log(profileData,"datos que llegan del backnd")
  } , [profileData]);



  const inputHandler = (event) => {
    setEditableProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
     
    }));
    
  };

  const buttonHandler = () => {
    setIsEditing(!isEditing);
  };

  
  const saveChanges = async () => {
    if (editableProfileData) {
      // Actualizar el perfil del usuario en la base de datos
      const updatedData = {
        name: editableProfileData.name,
        username: editableProfileData.username,
        surname: editableProfileData.surname,
        photo: editableProfileData.photo,
      };
      console.log(updatedData, " soy console en funcion");
  
      if (token) {
        try {
          updateUser(token, updatedData);
         // alert("Cambios guardados correctamente.");
         // dispatch(updateUserData(updatedData));
          setProfileData((prevState) => ({
            ...prevState,
            profileUser: {
              ...prevState.profileUser,
              name: updatedData.name,
              username: updatedData.username,
              surname: updatedData.surname,
              photo: updatedData.photo,
            },
          }));
          setIsEditing(false);
        } catch (error) {
          console.error("Error al actualizar el usuario: ", error.response);
        }
      } else {
        console.error("algo falla en función de guardar");
      }
    } else {
      console.error("userData is undefined");
    }
  };
  return (
    <>
      <div className="profileDesign">
        <div className="userInfo">
          <img src={profileData.artistProfile?.photo}></img>
          <h1 className="">{profileData.artistProfile?.username}</h1>
          <button onClick={() => buttonHandler()}>
            {isEditing ? "" : "Editar perfil"}
          </button>
          </div>
          <div className="updateData">
          {isEditing ? (
            <>
              <InputLogin
                name="name"
                type="text"
                handler={inputHandler}
                value={editableProfileData.artistProfile?.name}
                placeholder="Nombre"
               
              ></InputLogin>
              <InputLogin
                name="surname"
                type="text"
                handler={inputHandler}
                value={editableProfileData.artistProfile?.surname}
                placeholder="Apellido"
              ></InputLogin>
                <InputLogin
                name="email"
                type="email"
                handler={inputHandler}
                value={editableProfileData.artistProfile?.email}
                placeholder="email"
              ></InputLogin>
               <InputLogin
                name="photo"
                type="text"
                handler={inputHandler}
                value={editableProfileData.artistProfile?.photo}
                placeholder="Cambia tu foto"
              ></InputLogin>
            </>
          ) : null}
        </div>

        {isEditing ? (
          <button onClick={saveChanges}>Guardar cambios</button>
        ) : null}

        <h2>{profileData.artistProfile?.name}</h2>
        <h2>{profileData.artistProfile?.surname}</h2>
        <p>{profileData.artistProfile?.email}</p>




        <div className="appointmentsUserContainer">
  {profileData.artistProfile?.appointments?.map((appointment, index) => (
    <AppointmentCard
      key={index}
      artistName={appointment.user}
      date={moment(appointment.date).format("DD-MM-YYYY")}
      hour={appointment.hour}
    />
  ))}
</div>
</div>
     

    </>
  )
};



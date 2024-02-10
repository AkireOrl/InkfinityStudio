import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile, updateUser } from "../../Services/ApiCalls";
import { InputLogin } from "../../Components/InputLogin/InputLogin";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { AppointmentCard } from "../../Components/AppointmentsCard/AppointmentsCard.jsx";



export const Profile = () => {
  const userRdxDetail = useSelector(userData)
  // console.log(userRdxDetail, "En profile")
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  // console.log(profileData, "Linea de arriba qu eno es la 50")
  const [isEditing, setIsEditing] = useState(false);
  const token = userRdxDetail.credentials.token
  const decodedToken = jwtDecode(token)
  // console.log(token, "Token en Profile");
  const userId = decodedToken.userId;
  // console.log(userId);
  const dispatch = useDispatch();
  const [editableProfileData, setEditableProfileData] = useState({});
  // console.log(editableProfileData, "input data");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/register");
      } else {
        const res = await getProfile(token);
        setProfileData(res);

        //logica para determinar que entra en el seteditableprofiledata
        setEditableProfileData({
          username: res.profileUser.username,
          name: res.profileUser.name,
          surname: res.profileUser.surname,
          photo: res.profileUser.photo
          
        });
        
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    console.log(editableProfileData,"Estoy en el editable")
  } , [editableProfileData]);



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
          <img src={profileData.profileUser?.photo}></img>
          <h1 className="">{profileData.profileUser?.username}</h1>
          <button onClick={() => buttonHandler()}>
            {isEditing ? "Guardar cambios" : "Editar perfil"}
          </button>
          {isEditing ? (
            <>
              <InputLogin
                name="name"
                type="text"
                handler={inputHandler}
                value={editableProfileData.name}
                placeholder="Nombre"
               
              ></InputLogin>
              <InputLogin
                name="surname"
                type="text"
                handler={inputHandler}
                value={editableProfileData.surname}
                placeholder="Apellido"
              ></InputLogin>
                <InputLogin
                name="email"
                type="email"
                handler={inputHandler}
                value={editableProfileData.email}
                placeholder="email"
              ></InputLogin>
            </>
          ) : null}
        </div>

        {isEditing ? (
          <button onClick={saveChanges}>Guardar cambios</button>
        ) : null}

        <h2>{profileData.profileUser?.name}</h2>
        <h2>{profileData.profileUser?.surname}</h2>
        <p>{profileData.profileUser?.email}</p>




        <div className="appointmentsUserContainer">
          {profileData.appointments && profileData.userArtistIds.map((userArtistId, index) => (
            <AppointmentCard
              key={index}
              artistName={userArtistId}
              date={moment(profileData.appointments[index].date).format("DD-MM-YYYY")}
              hour={profileData.appointments[index].hour}

            />
          ))}
        </div>
      </div>

    </>
  )
};



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import { getProfile, updateUser } from "../../Services/ApiCalls";
// import { InputLogin } from "../../Components/InputLogin/InputLogin";
// import { useDispatch, useSelector } from "react-redux";
// import { userData } from "../userSlice";
// import { jwtDecode } from "jwt-decode";
// import moment from "moment";
// import { AppointmentCard} from "../../Components/AppointmentsCard/AppointmentsCard";

//  export const Profile = () => {
//   const [profileData, setProfileData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableProfileData, setEditableProfileData] = useState({});
//   const token = useSelector((state) => state.user.credentials.token);
//   const decodedToken = jwtDecode(token);
//   const userId = decodedToken ? decodedToken.id : undefined;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
 

//   const userData = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) {
//         navigate("/register");
//       } else {
//         const res = await getProfile(token);
//         setProfileData(res);
//         setEditableProfileData({
//           name: res.profileUser.name,
//           surname: res.profileUser.surname,
//           email: res.profileUser.email,
//         });
//       }
//     };
//     console.log(token, "soy token en profile")

//     fetchData();
//   }, [getProfile, token, navigate]);
 

//   const inputHandler = (event) => {
//     setEditableProfileData((prevState) => ({
//       ...prevState,
//       [event.target.name]: event.target.value,
//     }));
//   };


//   const buttonHandler = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditableProfileData({ ...editableProfileData, [name]: value });
//   };

//   const saveChanges = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3001/api/users/${userId}`, {
//         name: editableProfileData.name,
//         surname: editableProfileData.surname,
//         email: editableProfileData.email,
//       });

//       setProfileData(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error while updating user:', error);
//     }
//   };



//   return (
//     <>
//       <div className="profileDesign">
//         <div className="userInfo">
//           <img src={profileData.profileUser?.photo}></img>
//           <h1 className="">{profileData.profileUser?.username}</h1>
//           <button onClick={() => buttonHandler()}>
//             {isEditing ? "Guardar cambios" : "Editar perfil"}
//           </button>
//           {isEditing ? (
//             <>
//               <InputLogin
//                 name="firstName"
//                 type="text"
//                 handler={inputHandler}
//                 value={editableProfileData.name}
//                 placeholder="Nombre"
//               ></InputLogin>
//               <InputLogin
//                 name="lastName"
//                 type="text"
//                 handler={inputHandler}
//                 value={editableProfileData.surname}
//                 placeholder="Apellido"
//               ></InputLogin>
//               <InputLogin
//                 name="email"
//                 type="email"
//                 handler={inputHandler}
//                 value={editableProfileData.email}
//                 placeholder="email"
//               ></InputLogin>
//             </>
//           ) : null}
//         </div>

//         {isEditing ? (
//           <button onClick={saveChanges}>Guardar cambios</button>
//         ) : null}

//         <h2>{editableProfileData.name}</h2>
//         <h2>{editableProfileData.surname}</h2>
//         <p>{editableProfileData.email}</p>
//         {/* <h2>{profileData.profileUser?.name}</h2>
//         <h2>{profileData.profileUser?.surname}</h2>
//         <p>{profileData.profileUser?.email}</p> */}




//         <div className="appointmentsUserContainer">
//           {profileData.appointments && profileData.userArtistIds.map((userArtistId, index) => (
//             <AppointmentCard
//               key={index}
//               artistName={userArtistId}
//               date={moment(profileData.appointments[index].date).format("DD-MM-YYYY")}
//               hour={profileData.appointments[index].hour}

//             />
//           ))}
//         </div>
//       </div>

//     </>
//   )
// };

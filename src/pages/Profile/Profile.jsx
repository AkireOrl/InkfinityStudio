import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile } from "../../Services/ApiCalls";
import { InputLogin } from "../../Components/InputLogin/InputLogin";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { AppointmentCard } from "../../Components/AppointmentsCard/AppointmentsCard.jsx";


export const Profile = () => {
  const userRdxDetail = useSelector(userData)
  console.log(userRdxDetail, "En profile")
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  console.log(profileData, "Linea de arriba qu eno es la 50")
  const [isEditing, setIsEditing] = useState(false);
  const token = userRdxDetail.credentials.token
  //const decodedToken = jwtDecode(token)
  console.log(token, "Token en Profile");




  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/register");
      } else {
        const res = await getProfile(token);
        setProfileData(res);
      }
    };

    fetchData();
  }, [getProfile, token, navigate]);

  const inputHandler = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    console.log(isEditing)

    // if (isEditing === false) {
    //     setIsEditing(true)
    // } else {
    //     setIsEditing(false)
    // }
  };

  useEffect(() => {
    console.log(profileData, "no está llegando aquí");
  }, [profileData]);

  return (
    <>
      <div className="profileDesign">
        <div className="userInfo">
          <img src={profileData.profileUser?.photo}></img>
          <h1 className="">{profileData.profileUser?.username}</h1>
          <button onClick={() => buttonHandler()}></button>
          {isEditing
            ? (
              <InputLogin
                name="firstName"
                type="text"
                handler={inputHandler}
              ></InputLogin>
            ) : null}
        </div>

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


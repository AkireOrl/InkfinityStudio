import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile } from "../../Services/ApiCalls"; 
import { InputLogin } from "../../Components/InputLogin/InputLogin";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";

export const Profile = () => {
  const userRdxDetail = useSelector(userData)
   console.log(userRdxDetail, "En profile")
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  console.log(profileData, "Linea de arriba qu eno es la 50")
  const [isEditing, setIsEditing] = useState(false);
  const token = userRdxDetail.credentials.token
  //const decodedToken = jwtDecode(token)
  console.log(token, "Toekn en Profile");
 



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
     

      <h2>{profileData.profileUser?.name}</h2>
      <h2>{profileData.profileUser?.surname}</h2>
      <p>{profileData.profileUser?.email}</p> 
      
      {profileData.userArtistProfiles && profileData.userArtistProfiles.map((userArtistProfiles) => (
        <div key={userArtistProfiles.id}>
          <p>{userArtistProfiles.name}</p>
        </div>
      ))}
      {/* <h2>{profileData.userArtistProfiles?.name}</h2> no va */}
      {profileData.appointments && profileData.appointments.map((appointments) => (
        <div key={appointments.id}>    
          <p>  {appointments?.date?.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}</p>
          <p>{appointments?.hour}</p>
        </div>
      ))}

    </div>
    </>
  );
};
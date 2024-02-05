import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile } from "../../Services/ApiCalls"; 
import { InputLogin } from "../../Components/InputLogin/inputLogin";
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
  const decodedToken = jwtDecode(token)
  console.log(token, "Toekn en Profile");



  useEffect(() => {
    if (!token) {
     navigate("/register");
    } else {
      getProfile(token).then((res) => {
        setProfileData(res);
      });
    }
  }, []);

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
    console.log(profileData);
  }, [profileData, "no está llegando aquí"]);

  return (
    <div className="profileDesign">
      <h1 className="">{profileData.profileUser.username}</h1> 
      <button onClick={() => buttonHandler()}></button>
      {isEditing 
      ? (
        <InputLogin
          name="firstName"
          type="text"
          handler={inputHandler}
        ></InputLogin>
      ) : null}
      <h1>{profileData.profileUser.name}</h1>
      <h1>{profileData.profileUser.surname}</h1>
      <p>{profileData.profileUser.email}</p> 
      <img src={profileData.profileUser.photo}></img>
    </div>
  );
};
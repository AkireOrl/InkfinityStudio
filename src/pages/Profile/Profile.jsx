import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile } from "../../Services/ApiCalls"; 
import { InputLogin } from "../../Components/InputLogin/inputLogin";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
     //navigate("/register");
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
  }, [profileData]);

  return (
    <div className="profileDesign">
      <h1>{profileData.firstName}</h1>
      <button onClick={() => buttonHandler()}></button>
      {isEditing 
      ? (
        <InputLogin
          name="firstName"
          type="text"
          handler={inputHandler}
        ></InputLogin>
      ) : null}
      <h1>{profileData.eyeColor}</h1>
      <img src={profileData.image}></img>
    </div>
  );
};
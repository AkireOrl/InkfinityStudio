import "./SuperAdminView.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userSlice} from "../userSlice";
import { jwtDecode } from "jwt-decode";


export const SuperAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData);

    const token = userRdxData.credentials.token;
    const decodedToken = jwtDecode(token)
    const decoded = userRdxData.credentials.userData;
   // const roles = userRdxData.decoded.userRoles;
    const userRoles  = decodedToken.userRoles;
    const [profileData, setProfileData] = useState({});



    useEffect(() => {
        if (decoded.userRoles !== "super_admin") {
          //navigate("/");
          console.log(decoded.userRoles, "soy console en useEffect")
        } else {
          setTimeout(() => {
            bringAllUsers().then((res) => {
              console.log(res);
              setUsers(res);
            });
          }, 1000);
        }
      }, []);

    return  (
        <>
         <h2>{profileData.artistProfile?.username}</h2>
        </>

    );
}

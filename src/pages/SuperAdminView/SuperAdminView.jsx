import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userSlice } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { bringAllUsers } from "../../Services/ApiCalls";
import { Pagination } from "../../Components/Pagination/Pagination";
import { CardUser } from "../../Components/UserCard/UserCard";

 export const SuperAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const decodedToken = jwtDecode(token);
  const decoded = userRdxData.credentials.userData;
  const userRoles = decodedToken.userRoles;
  const [profileData, setProfileData] = useState({});

  const [page, setPage] = useState(1);

  useEffect(() => {
      if (token && userRoles == "super_admin") {
        const pageString = page.toString();
        bringAllUsers(token, pageString)
          .then((profileData) => {
       
            console.log(profileData, "estoy en funcion")
            if (profileData) {
              setProfileData(profileData);
            
            } else {
              // Do not update the page state if the API call returns an error or an empty array
            }
          })
          .catch((error) => console.log(error));
      } else {
        navigate("/login");
      }
  }, [page]);

  const up = () => {
    setPage(page + 1);
  };

  const down = () => {
    if (page >= 2) {
      setPage(page - 1);
    }
  };

  return (
    <div className="users-body">
      <div className="pagination-all-users">
        <Pagination
          className="previus"
          text="previus"
          paginationChanger={() => down()}
        />
        <Pagination
          className="next"
          text="next"
          paginationChanger={() => up()}
        />
      </div>
      <div className="container-all-users">
        {profileData.length > 0 ? (
          <div className="users-Roster">
            {profileData.map((profileData) => {
              // console.log(profileData.role_id, "soy console de roles")

              return (
                <CardUser
                  key={profileData.id}
                  username={profileData.username}
                  photo={profileData.photo}
                  name={profileData.name}
                  email={profileData.email}
                  role_name={profileData.roles[0].role_name}
                  
                />
              );
            })}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};
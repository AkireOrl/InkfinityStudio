
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
  const [profileData, setProfileData] = useState([]);

  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    if (token && userRoles[0] === "super_admin") {
      const pageString = page.toString();
      bringAllUsers(token, pageString)
        .then((profileData) => {
          if (profileData && profileData.length > 0) {
            setProfileData(profileData);
            console.log(profileData);
          } else {
            // No se debe actualizar el estado de la página si la llamada a la API devuelve un error o un array vacío
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUsers();
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
    <div className="users-body container-fluid col-9">
      <div className="pagination-all-users row gs-3 mt-5 justify-content-around align-items-end">
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
      <div className="container-all-users row gx-5 gy-3 mt-4 ">
        <div className="container-fluid col-9">
          {profileData.length > 0 ? (
            <div className="users-Roster row gx-5 justify-content-around">
              {profileData.map((profileData) => {
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
    </div>
  );
}

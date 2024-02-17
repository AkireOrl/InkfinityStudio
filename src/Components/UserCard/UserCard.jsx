import React from "react";
import "./UserCard.css"

export const CardUser = ({id, photo, name, role_name, username, email}) => {


    return (
      
        <div className="artist-card" key={id}>
        <div className="card-content">
          <img className="artist-img" src={photo}></img>
          <h3 id="artist-name">{name}</h3>
          <h3 className="role_name">{role_name}</h3>
          <h3 className="username">{username}</h3>
          <h3 className="email">{email}</h3>
          
        </div>
      </div>

    );
}


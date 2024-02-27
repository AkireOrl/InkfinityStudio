
import { useState } from "react";
import "./AppointAdminView.css";
import moment from "moment/moment";
import { InputLogin } from "../InputLogin/InputLogin";
export const AppointsAdmin = ({ id, name, date, hour, artistName, photo,}) => {



    return (
      <div className="appointAdmin" key={id}>
        <div className="card-content">
          <h3 className="artist-name">{artistName}</h3>
          <img className="userPhoto" src={photo}></img>
          <h4 className="date">{moment(date).format("DD-MM-YYYY")}</h4>
          <h4 className="hour">{hour}</h4>
          <h4 className="username">{name}</h4>

</div>
</div>
    )
};
 
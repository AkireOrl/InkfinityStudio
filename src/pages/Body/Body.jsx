import { Navigate, Route, Routes } from "react-router-dom"

import { Profile } from "../Profile/Profile"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Tatuadores } from "../Tatuadores/Tatuadores"
import { TatuProfile } from "../TatuDetails/TatuProfile"
import { SuperAdmin } from "../SuperAdminView/SuperAdminView"
import { SuperAppoint } from "../SuperAdAppoint/SuperAdAppoint"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home/>} />
                <Route path="/tatuadores" element={<Tatuadores/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tatuprofile" element={<TatuProfile />} />
                <Route path="/adminview" element={<SuperAdmin/>} />
                <Route path="/todascitas" element={<SuperAppoint/>} />
            </Routes>
        </>
    )
}
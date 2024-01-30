import { Navigate, Route, Routes } from "react-router-dom"

// import { Home } from "../Home/Home"
// import { Personajes } from "../Personajes/Personajes"
// import { CharacterDetail } from "../CharacterDetail/CharacterDetail"
// import { Profile } from "../Profile/Profile"
import { Login } from "./Login/Login"
import { Register } from "./Register/Register"
import { Home } from "./Home/Home"
import { Tatuadores } from "./Tatuadores/Tatuadores"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home/>} />
                <Route path="/tatuadores" element={<Tatuadores/>} />
                {/* <Route path="/profile" element={<Profile />} />
                
                <Route path="/characterdetail" element={<CharacterDetail />} /> */}
                
            </Routes>
        </>
    )
}
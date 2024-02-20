import axios from "axios";

//const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000"


export const bringAllArtist = async ()  =>{ //funcionando
    const res = await axios.get(`${API_URL}/api/artist`)
    return res.data
}

export  const getArtistById = async (token) => {//falta pulir esto
    const config = {
        headers:{
            Authorization: "Bearer " + token
        }
    }
    const res = await axios.get(`${API_URL}/api/artist/artistprofile/`,  config)
    return res.data
}
export const bringAllUsers = async (token, page=1)  =>{ 
    const config = {
        headers:{
            Authorization: "Bearer " + token
        }
    }
    const res = await axios.get(`${API_URL}/api/users/?page=${page}`, config)
    console.log(res.data.users, "que me llega de api")
    return res.data.users
}

export const createNewUser = async (registerData) => {  //funcionando
    const res = await axios.post (`${API_URL}/auth/register`, registerData)
    return res.data
}

export const userLogin = async (credentials) => {  //funcionando
    try {
        const res = await axios.post(`${API_URL}/auth/login`, credentials, {})
        const token = res.data.token
        return token
    } catch (error){
        console.error('Error en el login:', error);
    throw error;
    }
    
}

export const getProfile = async (token)  =>{ //funcionando
    const config = {
        headers:{
            Authorization: "Bearer " + token
        },
    }
    //console.log(config, "soy log de api")
    const res = await axios.get(`${API_URL}/api/users/profile2`, config)
    return res.data
}
export const updateUser = async (token, updateData) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        },
    };

    const res = await axios.patch(`${API_URL}/api/users/`,updateData, config);
   
    return res.data;
}
export const updatePortfolio = async (token, updateData) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        },
    }
    const res = await axios.patch(`${API_URL}/api/artist/`,updateData, config);
    return res.data;
}

export const getAllAppointments = async (token)  =>{ 
    const config = {
        headers:{
            Authorization: "Bearer " + token
        }
    }
    const res = await axios.get(`${API_URL}/api/appointment`, config)
    //console.log(res.data, "que me llega de api")
    return res.data
}

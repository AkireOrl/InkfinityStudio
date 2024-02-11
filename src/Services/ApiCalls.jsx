import axios from "axios";

//const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000"


export const bringAllArtist = async ()  =>{ //funcionando
    const res = await axios.get(`${API_URL}/api/artist`)
    return res.data
}

export  const getArtistById = async (id) => {// Cuando esté conectada a mi backend
    const res = await axios.get(`${API_URL}/artist/${id}`)
    return res.data
}
export const bringAllUsers = async ()  =>{ //Cuando esté conectada con mi backend (buscar bien los endpoints)
    const res = await  axios.get(`${API_URL}/users`)
    return res.data
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


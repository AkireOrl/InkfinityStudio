import axios from "axios";


//const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000"

// export const userLogin = async (credentials) => {
//     const res = await axios.post(`${API_URL}/auth/login`, credentials, {})
//     return res.data.token
// }


export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`)
    return res.data.results
}

export const bringAllArtist = async ()  =>{ //Cuando esté conectada con mi backend
    const res = await  axios.get(`${API_URL}/artist`)
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


// const rickToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiUmljayBTYW5jaGV6Iiwic3RhdHVzIjoiYWxpdmUiLCJzcGVjaWVzIjoiaHVtYW4iLCJyb2xlIjoiYWRtaW4iLCJwYXNzd29yZCI6InNpIGVzdGUgY2FtcG8gZXN0w6EgZW4gZWwgdG9rZW4sIHRlIHZhbiBhIGRlY2lyIGVuIGxhcyBlbnRyZXZpc3RhcyB0w6ljbmljYXMgcXVlIHRlIHZheWFzIGEgY2FzYSB5IHRlIGFjdWVzdGVzIn0.gtM3-rV1AEKRMnGJDTxur8q5s-dK-DP0qKq8KHySSrA"
// const mortyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiTW9ydHkgU21pdGgiLCJzdGF0dXMiOiJhbGl2ZSIsInNwZWNpZXMiOiJodW1hbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoic2kgZXN0ZSBjYW1wbyBlc3TDoSBlbiBlbCB0b2tlbiwgdGUgdmFuIGEgZGVjaXIgZW4gbGFzIGVudHJldmlzdGFzIHTDqWNuaWNhcyBxdWUgdGUgdmF5YXMgYSBjYXNhIHkgdGUgYWN1ZXN0ZXMifQ.uLELbajVdKOxRkfFmJ2l7A29fZuG61uESFPAZoXowgU"

// export const userLogin = (id) => {
//     if (id === "1") {
//         return rickToken
//     }
//     if (id === "2") {
//         return mortyToken
//     }
//     return 'el login ha salido mal, pero la función ha sido llamada, apiCalls.jsx, linea 22'
// }

export const userLogin = async (credentials) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, credentials, {})
        const token = res.data.token
        return token
    } catch (error){
        console.error('Error en el login:', error);
    throw error;
    }
    
}

export const getProfile = async (token)  =>{ 
    const config = {
        headers:{
            Authorization: "Bearer " + token
        },
    }
    console.log(config, "soy log de api")
    const res = await axios.get(`${API_URL}/api/users/profile`, config)
    return res.data
}
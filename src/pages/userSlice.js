
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {}
        }
    },
});

export const {login, logout} = userSlice.actions;
export const userData = (state) => state.user;//return implicito.
export default userSlice.reducer;
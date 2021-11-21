import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {}
    },
    reducers: {
        setUser: (state, user) => {
            state.value = Object.assign(state.value, user.payload)
        },
        clearUser: (state) => {
            state.value = {}
        },
        setUserMail: (state, mail) => {
            state.value = {...state.value, mail:mail.payload}
        },
    }
})

export const { setUser, setUserMail, clearUser } = userSlice.actions

export const selectUser = state => state.user.value

export default userSlice.reducer
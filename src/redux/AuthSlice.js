import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logOutUser: (state, action) => {
            state.userId = null;
            state.token = null;
            state.isAuthenticated = null;
        },
    },
});

export const {setUser, logOutUser} = authSlice.actions;

export default authSlice.reducer;
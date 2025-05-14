import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../../utils/axiosConfig";
import { loginApp } from "../../services/login/login";

const initialState = {
    accessToken: null,
    loading: false,
};

const login = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginApp.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginApp.fulfilled, (state, action) => {
                state.accessToken = action.payload;
                settings.setCookie(
                    "access_token",
                    action?.payload?.data?.token,
                    30
                );
                settings.setCookie("type", action?.payload?.data?.type, 30);
                state.loading = false;
            })
            .addCase(loginApp.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default login.reducer;

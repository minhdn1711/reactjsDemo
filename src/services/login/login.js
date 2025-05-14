import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

export const loginApp = createAsyncThunk(
    "login/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/auth/login`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const forgotPassWord = createAsyncThunk(
    "login/forgotPassWord",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/auth/api/v1/forgot-password`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const resetPassWord = createAsyncThunk(
    "login/resetPassWord",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/auth/api/v1/reset-password`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

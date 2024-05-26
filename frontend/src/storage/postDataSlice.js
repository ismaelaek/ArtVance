import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const initialState = {
	postData: {},
	postDataLoading: false,
	postDataError: null,
};



const postDataSlice = createSlice({
	name: "post-data",
	initialState,
	reducers: {
        setPostData: (state, action) => {
            state.postData = action.payload;
        }
	},
    extraReducers: (builder) => {
    }
});

export const { setPostData } = postDataSlice.actions;

export default postDataSlice.reducer;

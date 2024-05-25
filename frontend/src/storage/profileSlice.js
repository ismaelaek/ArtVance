import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";


const initialState = {
	profileTab: "1",
	userPosts: [],
	profilepostsIsLoading: false,
	postsError: null,
};

export const getUserPosts = createAsyncThunk(
	"profile/getUserPosts",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/${userId}/posts`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setSelectedTab: (state, action) => {
			state.profileTab = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserPosts.pending, (state) => {
				state.profilepostsIsLoading = true;
				state.postsError = null;
			})
			.addCase(getUserPosts.fulfilled, (state, action) => {
				state.profilepostsIsLoading = false;
				state.userPosts = action.payload;
				state.postsError = null;
			})
			.addCase(getUserPosts.rejected, (state, action) => {
				state.profilepostsIsLoading = false;
				state.postsError = action.payload;
			});
	},
});

export const { setSelectedTab } = profileSlice.actions;

export default profileSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api/";

export const followUser = createAsyncThunk(
	"follow/followUser",
	async ({ followerId, followedId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/follow/${followerId}/${followedId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const unfollowUser = createAsyncThunk(
	"follow/unfollowUser",
	async ({ followerId, followedId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/unfollow/${followerId}/${followedId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const followSlice = createSlice({
	name: "follow",
	initialState: {
		isFollowing: false,
		status: "idle",
		error: null,
	},
	reducers: {
		resetStatus: (state) => {
			state.status = "idle";
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(followUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(followUser.fulfilled, (state) => {
				state.isFollowing = true;
				state.status = "succeeded";
			})
			.addCase(followUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(unfollowUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(unfollowUser.fulfilled, (state) => {
				state.isFollowing = false;
				state.status = "succeeded";
			})
			.addCase(unfollowUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { resetStatus } = followSlice.actions;

export default followSlice.reducer;

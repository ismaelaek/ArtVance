import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	feedPosts: [],
	feedIsLoading: false,
	feedError: null,
};

export const getFeedPosts = createAsyncThunk(
	"feed/getFeedPosts",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`http://127.0.0.1:8000/api/${id}/feed`);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Error fetching feed posts"
			);
		}
	}
);

const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFeedPosts.pending, (state) => {
				state.feedIsLoading = true;
				state.feedError = null;
			})
			.addCase(getFeedPosts.fulfilled, (state, action) => {
				state.feedIsLoading = false;
				state.feedPosts = action.payload;
			})
			.addCase(getFeedPosts.rejected, (state, action) => {
				state.feedIsLoading = false;
				state.feedError = action.payload;
			});
	},
});

// Export the reducer
export default feedSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
	feedPosts: [],
	feedIsLoading: false,
	addIsLoading: false,
	feedError: null,
};
const token = Cookies.get("userToken");

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

export const addPost = createAsyncThunk(
	"feed/addPost",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/posts/new`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`, 
					},
				}
			);
			message.success(response.data.message);
			return response.data; 
		} catch (error) {
			return rejectWithValue(error.response?.data || "Error adding post");
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
			})
			.addCase(addPost.pending, (state) => {
				state.addIsLoading = true;
				state.feedError = null;
			})
			.addCase(addPost.fulfilled, (state, action) => {
				state.addIsLoading = false;
			})
			.addCase(addPost.rejected, (state, action) => {
				state.addIsLoading = false;
				state.feedError = action.payload;
			});
	},
});

// Export the reducer
export default feedSlice.reducer;

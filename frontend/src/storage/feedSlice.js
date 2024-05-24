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
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/posts/new`,
				payload,
				{
					headers: {
						"Content-Type": "multipart/form-data",
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

export const likePost = createAsyncThunk(
	"feed/likePost",
	async ({ userId, postId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/posts/${postId}/like`,
				{ user_id: userId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Error liking post");
		}
	}
);

export const unlikePost = createAsyncThunk(
	"feed/unlikePost",
	async ({ userId, postId }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`http://127.0.0.1:8000/api/posts/${postId}/unlike`,
				{
					data: { user_id: userId },
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Error unliking post");
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
			})
			.addCase(likePost.pending, (state) => {
				state.feedError = null;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.addIsLoading = false;
			})
			.addCase(likePost.rejected, (state, action) => {
				state.feedError = action.payload;
			})
			.addCase(unlikePost.pending, (state) => {
				state.feedError = null;
			})
			.addCase(unlikePost.fulfilled, (state, action) => {
				state.addIsLoading = false;
			})
			.addCase(unlikePost.rejected, (state, action) => {
				state.feedError = action.payload;
			});
	},
});

// Export the reducer
export default feedSlice.reducer;

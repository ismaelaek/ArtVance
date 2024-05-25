import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getAllPosts = createAsyncThunk(
	"posts/getAllPosts",
	async () => {
		try {
			const response = await axios.get(`${API_URL}/posts`);
			return response.data;
		} catch (error) {
			return error.message;
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/posts/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		allPosts: [],
		postsIsLoadin: false,
		postsError: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPosts.pending, (state) => {
				state.postsIsLoadin = true;
			})
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.postsIsLoadin = false;
                state.allPosts = action.payload;
			})
            .addCase(getAllPosts.rejected, (state, action) => {
                state.postsIsLoadin = false;
                state.postsError = action.error.message;
			})
		    .addCase(deletePost.pending, (state) => {
                state.postsIsLoadin = true;
			})
		    .addCase(deletePost.fulfilled, (state, action) => {
                state.postsIsLoadin = false;
			})
		    .addCase(deletePost.rejected, (state, action) => {
                state.postsIsLoadin = false;
                state.postsError = action.error.message;
            })
	},
});


export default postsSlice.reducer;

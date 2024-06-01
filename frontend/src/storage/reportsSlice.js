import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/report";


export const fetchTopReportedUsers = createAsyncThunk(
	"report/fetchTopReportedUsers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/top-users`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchTopReportedPosts = createAsyncThunk(
	"report/fetchTopReportedPosts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/top-posts`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);


export const reportUser = createAsyncThunk(
	"report/reportUser",
	async (reportedUserId, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/user`, {
				reported_user_id: reportedUserId,
			});
			message.success(response.data.message);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const reportPost = createAsyncThunk(
	"report/reportPost",
	async (reportedPostId, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/post`, {
				reported_post_id: reportedPostId,
			});
			message.success(response.data.message);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const reportsSlice = createSlice({
	name: "report",
	initialState: {
		reportedUsers: [],
		reportedPosts: [],
		reportIsLoading: false,
		reportError: null,
		reportUserSuccess: false,
		reportPostSuccess: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			
			.addCase(fetchTopReportedUsers.pending, (state) => {
				state.reportIsLoading = true;
				state.reportError = null;
			})
			.addCase(fetchTopReportedUsers.fulfilled, (state, action) => {
				state.reportIsLoading = false;
				state.reportedUsers = action.payload;
			})
			.addCase(fetchTopReportedUsers.rejected, (state, action) => {
				state.reportIsLoading = false;
				state.reportError = action.payload;
			})
			
			.addCase(fetchTopReportedPosts.pending, (state) => {
				state.reportIsLoading = true;
				state.reportError = null;
			})
			.addCase(fetchTopReportedPosts.fulfilled, (state, action) => {
				state.reportIsLoading = false;
				state.reportedPosts = action.payload;
			})
			.addCase(fetchTopReportedPosts.rejected, (state, action) => {
				state.reportIsLoading = false;
				state.reportError = action.payload;
			})
			
			.addCase(reportUser.pending, (state) => {
				state.reportIsLoading = true;
				state.reportError = null;
				state.reportUserSuccess = false;
			})
			.addCase(reportUser.fulfilled, (state) => {
				state.reportIsLoading = false;
				state.reportUserSuccess = true;
			})
			.addCase(reportUser.rejected, (state, action) => {
				state.reportIsLoading = false;
				state.reportError = action.payload;
            })
            
			.addCase(reportPost.pending, (state) => {
				state.reportIsLoading = true;
				state.reportError = null;
				state.reportPostSuccess = false;
			})
			.addCase(reportPost.fulfilled, (state) => {
				state.reportIsLoading = false;
				state.reportPostSuccess = true;
			})
			.addCase(reportPost.rejected, (state, action) => {
				state.reportIsLoading = false;
				state.reportError = action.payload;
			});
	},
});

export default reportsSlice.reducer;



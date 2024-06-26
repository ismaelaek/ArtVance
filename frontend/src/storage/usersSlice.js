import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

const API_URL = "http://127.0.0.1:8000/api/users";

const initialState = {
	targetUser: {},
	users: [],
	unfollwedUsers: [],
	followStats: {},
	usersIsLoading: false,
	usersError: null,
};

const getUsers = createAsyncThunk("users/getUsers", async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		throw error;
	}
});

const getUnfollowedUsers = createAsyncThunk(
	"users/getUnfollowedUsers",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/unfollowed/${userId}`);
			return response.data.unfollowed_users;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const getFollowStats = createAsyncThunk(
	"users/getFollowStats",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/${userId}/follow-stats`);
			return response.data ;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const getUser = createAsyncThunk(
	"users/getUser",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/${userId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);


const UsersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers(state, action) {
			state.users = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.usersIsLoading = false;
				state.users = action.payload;
				state.usersError = null;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			})
			.addCase(getUnfollowedUsers.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(getUnfollowedUsers.fulfilled, (state, action) => {
				state.usersIsLoading = false;
				state.unfollwedUsers = action.payload;
				state.usersError = null;
			})
			.addCase(getUnfollowedUsers.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			})
			.addCase(getFollowStats.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(getFollowStats.fulfilled, (state, action) => {
				state.usersIsLoading = false;
				state.followStats = action.payload;
				state.usersError = null;
			})
			.addCase(getFollowStats.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			})
			.addCase(getUser.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.usersIsLoading = false;
				state.targetUser = action.payload;
				state.usersError = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			});
		
	},
});

export { getUsers, getUnfollowedUsers, getFollowStats, getUser };
export default UsersSlice.reducer;

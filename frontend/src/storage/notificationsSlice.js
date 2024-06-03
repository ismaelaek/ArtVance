import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/notifications";

export const fetchUserNotifications = createAsyncThunk(
	"notifications/fetchUserNotifications",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		userNotifications: [],
		notificationIsLoading: false,
		notificationError: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserNotifications.pending, (state) => {
				state.notificationIsLoading = true;
				state.notificationError = null;
			})
			.addCase(fetchUserNotifications.fulfilled, (state, action) => {
				state.notificationIsLoading = false;
				state.userNotifications = action.payload;
			})
			.addCase(fetchUserNotifications.rejected, (state, action) => {
				state.notificationIsLoading = false;
				state.notificationError = action.payload;
				message.error("Error fetching notifications");
			});
	},
});

export default notificationsSlice.reducer;

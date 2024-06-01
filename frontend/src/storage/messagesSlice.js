import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getConversationMessages = createAsyncThunk(
	"messages/getConversationMessages",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_URL}/conversations/${id}/messages`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Error fetching messages");
		}
	}
);

const messagesSlice = createSlice({
	name: "messages",
	initialState: {
		messages: [],
		messagesIsLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getConversationMessages.pending, (state) => {
				state.messagesIsLoading = true;
				state.error = null;
			})
			.addCase(getConversationMessages.fulfilled, (state, action) => {
				state.messagesIsLoading = false;
				state.messages = action.payload.messages;
				state.error = null;
			})
			.addCase(getConversationMessages.rejected, (state, action) => {
				state.messagesIsLoading = false;
				state.error = action.payload || "Error fetching messages";
			});
	},
});

export default messagesSlice.reducer;

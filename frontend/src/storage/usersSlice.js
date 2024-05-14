import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

const initialState = {
	users: [],
	usersIsLoading: false,
	usersError: null,
};

const getUsers = createAsyncThunk("getUsers", async () => {
	try {
		const token = Cookies.get("token");
		const response = await axios.get("http://127.0.0.1:8000/api/users", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
});


const deleteUser = createAsyncThunk("deleteUser", async (userId, thunkAPI) => {
	try {
		const token = Cookies.get("token");
		await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		message.success("User deleted successfully");
		// Remove the deleted user from the state
		thunkAPI.dispatch(removeUser(userId));
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
});

const updateUser = createAsyncThunk(
	"updateUser",
	async (formData, thunkAPI) => {
		try {
			const { id, ...data } = formData; 
			const token = Cookies.get("userToken");
			const response = await axios.put(
				`http://127.0.0.1:8000/api/users/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			message.success("Info updated successfully");
			thunkAPI.dispatch(getUsers()); 
			return response.data;
		} catch (error) {
			console.error("Error updating user:", error);
			throw error;
		}
	}
);

const removeUser = (userId) => (dispatch, getState) => {
	const { users } = getState().users;
	const updatedUsers = users.filter((user) => user.id !== userId);
	dispatch(setUsers(updatedUsers));
};

const setUsers = (users) => (dispatch) => {
	dispatch({ type: "users/setUsers", payload: users });
};

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
			.addCase(deleteUser.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.usersIsLoading = false;
				state.usersError = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			})
			.addCase(updateUser.pending, (state) => {
				state.usersIsLoading = true;
				state.usersError = null;
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.usersIsLoading = false;
				state.usersError = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.usersIsLoading = false;
				state.usersError = action.error.message;
			});
	},
});

export { getUsers, deleteUser, updateUser };
export default UsersSlice.reducer;

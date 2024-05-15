import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	profileTab: "1",
};

const profileSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setSelectedTab: (state, action) => {
			state.profileTab = action.payload;
		},
	},
});
export const { setSelectedTab } = profileSlice.actions;


export default profileSlice.reducer;

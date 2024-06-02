import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedTab: "1",
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setSelectedTab: (state, action) => {
			state.selectedTab = action.payload;
		},
	},
});

export const { setSelectedTab } = dashboardSlice.actions;

export default dashboardSlice.reducer;
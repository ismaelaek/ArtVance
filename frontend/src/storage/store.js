import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";
import profileSlice from "./profileSlice";
import followSlice from "./followSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		profile: profileSlice,
		follow: followSlice,
	},
});

export default store;

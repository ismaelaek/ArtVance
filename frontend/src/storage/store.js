import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";
import profileSlice from "./profileSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		profile: profileSlice,
	},
});

export default store;

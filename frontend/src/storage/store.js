import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";
import profileSlice from "./profileSlice";
import followSlice from "./followSlice";
import feedSlice from "./feedSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		profile: profileSlice,
		follow: followSlice,
		feed: feedSlice,
	},
});

export default store;

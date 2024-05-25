import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";
import profileSlice from "./profileSlice";
import followSlice from "./followSlice";
import feedSlice from "./feedSlice";
import postsSlice from "./postsSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		profile: profileSlice,
		follow: followSlice,
		feed: feedSlice,
		posts: postsSlice,
	},
});

export default store;

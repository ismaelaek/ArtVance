import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import profileSlice from "./profileSlice";
import followSlice from "./followSlice";
import feedSlice from "./feedSlice";
import postsSlice from "./postsSlice";
import productsSlice from "./productsSlice";
import postDataSlice from "./postDataSlice";
import messagesSlice from "./messagesSlice";
import reportsSlice from "./reportsSlice";
import notificationsSlice from "./notificationsSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		profile: profileSlice,
		follow: followSlice,
		feed: feedSlice,
		posts: postsSlice,
		products: productsSlice,
		postData: postDataSlice,
		messages: messagesSlice,
		reports: reportsSlice,
		notifications: notificationsSlice,
	},
});

export default store;

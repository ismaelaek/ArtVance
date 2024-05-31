import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "./profile/timeLine/createPost";
import Post from "./profile/timeLine/post";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/storage/usersSlice";
import { getUnfollowedUsers } from "@/storage/usersSlice";
import SuggestItem from "./suggestItem";
import { getFeedPosts } from "@/storage/feedSlice";
import LoadingSuggestion from "./loadingSuggestion";
import LoadingPost from "./profile/timeLine/loadingPost";

const Feed = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [suggestions, setSuggestions] = useState([]);
	const { users, unfollwedUsers, usersIsLoading } = useSelector(
		(state) => state.users
	);
	const { feedPosts, feedIsLoading } = useSelector((state) => state.feed);
	useEffect(() => {
		if (localStorage.getItem("loggedUser") == null) {
			navigate("/login");
		}
		dispatch(getUsers());
		dispatch(getUnfollowedUsers(logged != null ? logged.id : null));
		dispatch(getFeedPosts(logged != null ? logged.id : null));
	}, [dispatch, logged != null ? logged.id : null]);

	useEffect(() => {
		const randomStartIndex = Math.floor(
			Math.random() * (unfollwedUsers.length - 8)
		);
		setSuggestions(
			unfollwedUsers.slice(randomStartIndex, randomStartIndex + 8)
		);
	}, [unfollwedUsers]);

	return (
		<main className="rounded-2xl h-full p-3 feed-main">
			{feedIsLoading ? (
				<div className="p-3 rounded-2xl">
					<LoadingPost />
					<LoadingPost />
					<LoadingPost />
				</div>
			) : (
				<div className=" p-3 rounded-2xl">
					<CreatePost />
					<div className="posts mt-2">
						{feedPosts.map((post, index) => (
							<Post post={post} key={index} logged={logged} />
						))}
					</div>
				</div>
			)}
			<div className="bg-white p-3 rounded-2xl h-fit mt-3">
				<div>
					<p className=" text-lg border-b-2 border-gray-100">You might know</p>
				</div>
				<div>
					{usersIsLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<LoadingSuggestion key={index} />
						  ))
						: suggestions.map((user) => (
								<SuggestItem key={user.id} user={user} />
						  ))}
				</div>
			</div>
		</main>
	);
};

export default Feed;

import React, { useEffect, useState } from "react";
import CreatePost from "./profile/timeLine/createPost";
import Post from "./profile/timeLine/post";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/storage/usersSlice";
import { getUnfollowedUsers } from "@/storage/usersSlice";
import SuggestItem from "./suggestItem";

const Feed = () => {
	const dispatch = useDispatch();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [suggestions , setSuggestions] = useState([])
	const { users, unfollwedUsers, usersIsLoading } = useSelector(
		(state) => state.users
	);
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getUnfollowedUsers(logged.id));
	}, [dispatch, logged.id]);

	useEffect(() => {
        setSuggestions(unfollwedUsers.slice(0, 8));
	}, [unfollwedUsers])
	
	
	return (
		<main className="rounded-2xl h-full p-3 feed-main">
			<div className=" p-3 rounded-2xl">
				<CreatePost />
				{/* // ! hna fin ghaykono les posts*/}
				<div className="posts mt-2">
					{/* // ! hadhci ghaytms7 w ghaykon map dyal les post */}

					{/* ###################################*/}
					<Post />
					<Post />
					<Post />
					<Post />
					{/* ###################################*/}
				</div>
			</div>
			<div className="bg-white p-3 rounded-2xl h-fit mt-3">
				<div>
					<p className=" text-lg border-b-2 border-gray-100">You might like</p>
				</div>
				<div>
					{usersIsLoading ? (
						<p>Loading...</p>
					) : (
						suggestions.map((user) => (
							<SuggestItem
								key={user.id}
								user={user}
							/>
						))
					)}
				</div>
			</div>
		</main>
	);
};

export default Feed;


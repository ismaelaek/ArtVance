import React, { useEffect } from "react";
import CreatePost from "./createPost";
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "@/storage/profileSlice";
import {
	FaPhone,
	FaMapMarkerAlt,
	FaEnvelope,
	FaMale,
	FaFemale,
	FaBirthdayCake,
} from "react-icons/fa";

function TimeLine({ user }) {
	const dispatch = useDispatch();
	const { userPosts, profilePostsIsLoading } = useSelector(
		(state) => state.profile
	);
	const { postsIsLoading } = useSelector((state) => state.posts);
	const logged = JSON.parse(localStorage.getItem("loggedUser"));

	useEffect(() => {
		dispatch(getUserPosts(user.id));
	}, [dispatch, user.id, postsIsLoading]);

	return (
		<div className="profile-timeline">
			<div className="mt-12">
				{logged.id === user.id && <CreatePost />}
				{userPosts.length < 1 && (
					<div className="w-full flex justify-center mt-4">
						<p>No posts yet</p>
					</div>
				)}
				{userPosts.map((item, index) => {
					return <Post key={index} post={item} logged={logged} />;
				})}
			</div>
			<div className="w-full  p-3 mt-5 rounded-xl">
			</div>
		</div>
	);
}

export default TimeLine;

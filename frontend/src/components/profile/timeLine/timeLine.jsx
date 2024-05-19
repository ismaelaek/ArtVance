import React, { useEffect } from "react";
import CreatePost from "./createPost";
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "@/storage/profileSlice";


function TimeLine() {
	const dispatch = useDispatch();
	const { userPosts, postsIsLoading } = useSelector((state) => state.profile);
	const logged = JSON.parse(localStorage.getItem('loggedUser'))

	console.log(logged);
	useEffect(() => {
        dispatch(getUserPosts(logged.id));
	}, [dispatch, logged.id]);
	
	return (
		<div className="profile-timeline">
			<div className="mt-12">
				<CreatePost />
				{userPosts.map((item, index) => {
					return <Post key={index} post={item} logged={logged} />;
				})}
			</div>
			<div className=" w-full bg-white h-full p-3 mt-5 rounded-xl">
				<h1>Hello</h1>
			</div>
		</div>
	);
}

export default TimeLine;

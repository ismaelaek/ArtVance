import React from "react";
import ProfilePic from "../assets/profile.jpg";
import CreatePost from "./profile/timeLine/createPost";
import Post from "./profile/timeLine/post";

const Feed = () => {
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
				<SuggestItem />
				<SuggestItem />
				<SuggestItem />
				<SuggestItem />
				<SuggestItem />
			</div>
		</main>
	);
};

export default Feed;

const SuggestItem = () => {
	return (
		<div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
			<div className="suggestion">
				<div className="w-11 h-11 flex justify-center items-center rounded-full overflow-hidden">
					<img src={ProfilePic} alt="" className="w-full" />
				</div>
				<div>
					<p className=" p-0 m-0 text-lg">Ahmed Mouhssine</p>
					<p className=" p-0 m-0text-sm text-gray-500">Cairo, Egypt</p>
				</div>
			</div>
			<div className="w-full flex justify-evenly text-xl">
				<button className=" btn btn-primary w-2/5 ">
					Follow
				</button>
				<button  className="btn btn-outline-primary w-2/5 ">
					Ignore
				</button>
			</div>
		</div>
	);
};

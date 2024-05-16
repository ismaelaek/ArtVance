import React from "react";
import ProfilePic from "../assets/profile.jpg";
import { Button } from "antd";

const Feed = () => {
	return (
		<main className="rounded-2xl h-full p-3 feed-main">
			<div className=" p-3 rounded-2xl">
				<div className="bg-white">
					<h1>New Post</h1>
				</div>
			</div>
			<div className="bg-white p-3 rounded-2xl">
				<div>
					<p className="text-lg border-b-2 border-gray-100">You might like</p>
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

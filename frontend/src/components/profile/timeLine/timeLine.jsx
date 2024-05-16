import React from "react";
import CreatePost from "./createPost";
import Post from "./post";

function TimeLine() {
	return (
		<div className="profile-timeline">
			<div className="mt-12">
				<CreatePost />
				<Post />
            </div>
            <div className=" w-full bg-white h-full p-3 mt-5 rounded-xl">
                <h1>Hello</h1>
            </div>
		</div>
	);
}

export default TimeLine;

import React, { useState } from "react";
import { Avatar } from "antd";
import ProfilePic from "../assets/profile.jpg";

const SuggestItem = ({ user }) => {
    const [ignored, setIgnored] = useState(false); 
    const avatarSrc = user.photo ? user.photo : ProfilePic;
    
    const handleIgnore = () => {
        setIgnored(true);
    }
	return (
		<div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
			<div className="suggestion">
				<div className="h-11 flex justify-center items-center overflow-hidden">
					<Avatar src={avatarSrc} className="h-full w-full" />
				</div>
				<div>
					<p className="p-0 m-0 text-lg">{user.nickname}</p>
					<p className="p-0 m-0 text-sm text-gray-500">{user.address}</p>
				</div>
			</div>
			{ignored ? (
                <div className="py-2 w-full justify-center ">
                    <p className="p-2 m-0 text-center text-gray-500">Ignored</p>
                </div>
			) : (
				<div className=" py-2 w-full flex justify-evenly text-xl">
					<button className="btn btn-primary w-2/5">Follow</button>
					<button
						className="btn btn-outline-primary w-2/5"
						onClick={handleIgnore}>
						Ignore
					</button>
				</div>
			)}
		</div>
	);
};

export default SuggestItem;

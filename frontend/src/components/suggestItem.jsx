import React, { useState } from "react";
import { Avatar, message } from "antd";
import ProfilePic from "../assets/profile.jpg";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "@/storage/followSlice";

const SuggestItem = ({ user }) => {
    const dispatch = useDispatch();
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    const [ignored, setIgnored] = useState(false); 
    const [isFollowing, setIsFollowing] = useState(false); 
    
    const avatarSrc = user.photo ? user.photo : ProfilePic;

    const handleFollow = () => {
        try {
            dispatch(followUser({ followerId: logged.id, followedId: user.id }));
            setIsFollowing(true);
        } catch (error) {
            message.error(error.message)
        }
    };

    const handleUnfollow = () => {
        try {
            dispatch(unfollowUser({ followerId: logged.id, followedId: user.id }));
            setIsFollowing(false);
        } catch (error) {
            message.error(error.message)
        }
    };

    const handleIgnore = () => {
        setIgnored(true);
    };

    return (
			<div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
				<div className="suggestion">
					<div className="flex justify-center items-center overflow-hidden">
						<Avatar src={avatarSrc} size={50}  />
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
						{isFollowing ? (
							<button
								className="btn btn-outline-primary w-2/5"
								onClick={handleUnfollow}>
								Unfollow
							</button>
						) : (
							<button className="btn btn-primary w-2/5" onClick={handleFollow}>
								Follow
							</button>
						)}
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

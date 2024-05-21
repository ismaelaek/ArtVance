import React, { useState } from "react";
import ProfilePic from "../../assets/profile.jpg";
import { Avatar, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "@/storage/followSlice";

function Friends({ stats, logged }) {
	const { followers, following } = stats;
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">
				Following ({following?.length})
			</h1>
			<div className="grid grid-cols-3 gap-4 p-4">
				{following.map((user) => {
					return <FollowingCard key={user.id} user={user}  logged={logged}/>;
				})}
			</div>
			<h1 className="text-2xl font-bold mb-4">
				Followers ({followers?.length})
			</h1>
		</div>
	);
}

export default Friends;


const FollowingCard = ({ user, logged }) => {
	const dispatch = useDispatch();
	const [isFollowing, setIsFollowing] = useState(true);
	const avatarSrc = user.photo ? user.photo : ProfilePic;

	const handleFollow = async () => {
		try {
			await dispatch(followUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowing(true);
		} catch (error) {
			message.error(error.message);
		}
	};

	const handleUnfollow = async () => {
		try {
			await dispatch(unfollowUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowing(false);
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
			<div className="flex items-center mb-2">
				<div className="flex justify-center items-center overflow-hidden">
					<Avatar src={avatarSrc} size={60} className="h-full w-full" />
				</div>
				<div className="ml-4 mt-3">
					<p className="m-0 text-lg">{user.nickname}</p>
					<p className="text-sm text-gray-500">{user.address}</p>
				</div>
			</div>
			<div className="w-full flex justify-evenly text-xl">
				<button className="btn btn-primary w-2/5">Message</button>
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
			</div>
		</div>
	);
};


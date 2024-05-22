import React, { useState, useEffect } from "react";
import ProfilePic from "../../assets/profile.jpg";
import { Avatar, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "@/storage/followSlice";

const { Search } = Input;

function Friends({ stats, logged, hint }) {
	const { followers, following } = stats;
	const [searchTerm, setSearchTerm] = useState("");

	const filteredFollowing = following.filter((user) =>
		user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredFollowers = followers.filter((user) =>
		user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="">
			{hint === "followers" ? (
				<>
					<div className=" flex justify-center">
						<Search
							placeholder="Search by nickname"
							onChange={(e) => setSearchTerm(e.target.value)}
							className=" mt-5 w-2/3"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 p-4">
						{filteredFollowing.map((user) => (
							<FollowingCard key={user.id} user={user} logged={logged} />
						))}
					</div>
				</>
			) : (
				<>
					<div className="flex justify-center">
						<Search
							placeholder="Search by nickname"
							onChange={(e) => setSearchTerm(e.target.value)}
							className=" mt-5 w-2/3"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 p-4">
						{filteredFollowers.map((user) => (
							<FollowerCard
								key={user.id}
								user={user}
								logged={logged}
								following={following}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Friends;

const FollowingCard = ({ user, logged }) => {
	const dispatch = useDispatch();
	const [isFollowing, setIsFollowing] = useState(true);
	const avatarSrc = user.photo ? user.photo : ProfilePic;

	const handleFollow = () => {
		try {
			dispatch(followUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowing(true);
		} catch (error) {
			message.error(error.message);
		}
	};

	const handleUnfollow = () => {
		try {
			dispatch(unfollowUser({ followerId: logged.id, followedId: user.id }));
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

const FollowerCard = ({ user, logged, following }) => {
	const dispatch = useDispatch();
	const [isFollowingBack, setIsFollowingBack] = useState(false);
	const avatarSrc = user.photo ? user.photo : ProfilePic;

	useEffect(() => {
		setIsFollowingBack(
			following.some((followedUser) => followedUser.id === user.id)
		);
	}, [following, user.id]);

	const handleFollowBack = () => {
		try {
			dispatch(followUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowingBack(true);
		} catch (error) {
			message.error(error.message);
		}
	};

	const handleUnfollow = () => {
		try {
			dispatch(unfollowUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowingBack(false);
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
				{isFollowingBack ? (
					<button
						className="btn btn-outline-primary w-2/5"
						onClick={handleUnfollow}>
						Unfollow
					</button>
				) : (
					<button className="btn btn-primary w-2/5" onClick={handleFollowBack}>
						Follow Back
					</button>
				)}
			</div>
		</div>
	);
};

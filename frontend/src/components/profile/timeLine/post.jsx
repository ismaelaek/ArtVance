import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, Form, Input, Dropdown, Menu, Carousel } from "antd";
import ProfilePic from "../../../assets/profile.jpg";
import {
	SendOutlined,
	MoreOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import {
	FaRegHeart,
	FaRegComment,
	FaHeart,
	FaRegBookmark,
	FaBookmark,
} from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "@/storage/feedSlice";
import { debounce } from "lodash";

const { TextArea } = Input;
const { Item } = Form;

function Post({ post, logged }) {
	const [user, setUser] = useState({});
	const [postMedia, setPostMedia] = useState([]);
	const [postLikes, setPostLikes] = useState(0);
	const [liked, setLiked] = useState(false); 
	const [bookmarked, setBookmarked] = useState(false);

	const dispatch = useDispatch();

	const fetchUser = async (userId) => {
		const cachedUserData = localStorage.getItem(`user_${userId}`);
		if (cachedUserData) {
			return JSON.parse(cachedUserData);
		} else {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/users/${userId}`
			);
			localStorage.setItem(`user_${userId}`, JSON.stringify(response.data));
			return response.data;
		}
	};

	const fetchPostMedia = async (postId) => {
		const cachedPostMedia = localStorage.getItem(`post_media_${postId}`);
		if (cachedPostMedia) {
			return JSON.parse(cachedPostMedia);
		} else {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/posts/${postId}/media`
			);
			localStorage.setItem(
				`post_media_${postId}`,
				JSON.stringify(response.data.media)
			);
			return response.data.media;
		}
	};

	const fetchPostLikes = async (postId) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/posts/${postId}/likes-count`
		);
		return response.data.likesCount;
	};

	const checkIfUserLikedPost = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/posts/${post.id}/has-liked/${logged.id}`
			);
			return response.data.hasLiked;
		} catch (error) {
			console.error("Error checking if user liked post:", error);
			return false; 
		}
	};

	useEffect(() => {
		const getUser = async () => {
			try {
				const userData = await fetchUser(post.user_id);
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		const getPostMedia = async () => {
			try {
				const mediaData = await fetchPostMedia(post.id);
				setPostMedia(mediaData);
			} catch (error) {
				console.error("Error fetching post media:", error);
			}
		};

		const getPostLikes = async () => {
			try {
				const likesCount = await fetchPostLikes(post.id);
				setPostLikes(likesCount);
			} catch (error) {
				console.error("Error fetching post likes:", error);
			}
		};

		const checkLikedStatus = async () => {
			const likedStatus = await checkIfUserLikedPost();
			setLiked(likedStatus);
		};

		getUser();
		getPostMedia();
		getPostLikes();
		checkLikedStatus();
	}, [post.user_id, post.id]);

	const debouncedFetchPostLikes = useCallback(
		debounce(async () => {
			try {
				const likesCount = await fetchPostLikes(post.id);
				setPostLikes(likesCount);
			} catch (error) {
				console.error("Error fetching post likes:", error);
			}
		}, 500),
		[post.id]
	);

	const handleLikeClick = () => {
		try {
			if (liked) {
				dispatch(unlikePost({ userId: logged.id, postId: post.id }));
			} else {
				dispatch(likePost({ userId: logged.id, postId: post.id }));
			}
			setLiked(!liked);
			debouncedFetchPostLikes();
		} catch (error) {
			console.error("Error toggling like status:", error);
		}
	};

	const handleBookmarkClick = () => {
		setBookmarked(!bookmarked);
	};

	const profilePicStyle = {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		marginRight: "10px",
	};
	const avatarSrc = user.photo ? user.photo : ProfilePic;

	const date = new Date(post.created_at);
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};
	const formattedTime = date.toLocaleString("sv-SE", options).replace(",", "");

	const handleMenuClick = (e) => {
		if (e.key === "edit") {
			console.log("Edit post");
		} else if (e.key === "delete") {
			console.log("Delete post");
		}
	};

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="edit" icon={<EditOutlined />}>
				Edit Post
			</Menu.Item>
			<Menu.Item key="delete" icon={<DeleteOutlined />}>
				Delete Post
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="p-3 rounded-xl mt-12 bg-white">
			<div className="flex justify-between">
				<div className="flex items-center">
					<img src={avatarSrc} alt="Profile" style={profilePicStyle} />
					<div className="ml-2 mt-3">
						<Link
							to={`/profile/${post.user_id}`}
							className="m-0 no-underline font-semibold text-xl text-black">
							{user.nickname}
						</Link>
						<p style={{ fontSize: "14px", color: "gray" }}>{formattedTime}</p>
					</div>
				</div>
				{logged.id === post.user_id && (
					<Dropdown overlay={menu} trigger={["click"]}>
						<Button
							icon={<MoreOutlined />}
							style={{ border: "none", fontSize: "20px" }}
						/>
					</Dropdown>
				)}
			</div>
			<div className="mt-2 w-full">
				<p className="text-lg text-gray-700 mb-2">{post.caption}</p>
				<div className="w-full flex justify-center items-center overflow-hidden">
					<div className="w-full max-w-2xl">
						{postMedia.length > 0 && (
							<Carousel
								arrows
								style={{
									height: "600px",
								}}
								className="w-full max-w-2xl overflow-hidden">
								{postMedia.map((media, index) => (
									<div key={index} className="flex justify-center items-center">
										<img
											src={media.url}
											alt={`Post ${index + 1}`}
											className="h-full object-center"
											style={{
												width: "100%",
												aspectRatio: "1/1",
											}}
										/>
									</div>
								))}
							</Carousel>
						)}
					</div>
				</div>
			</div>

			<hr className="border-gray-400 w-full mt-2" />

			<div className="flex items-center justify-between">
				<div className=" flex gap-2 items-center">
					<span className="flex gap-1 items-center ">
						<Button
							icon={liked ? <FaHeart color="#e84393" /> : <FaRegHeart />}
							onClick={handleLikeClick}
							className=""
							style={{ border: "none", fontSize: "20px" }}
						/>
						{postLikes !== 0 && (
							<p className="text-xl text-gray-700 mt-3">{postLikes}</p>
						)}
					</span>
					<Button
						icon={<FaRegComment />}
						style={{ border: "none", fontSize: "20px" }}
					/>
					<Button
						icon={<IoPaperPlaneOutline />}
						style={{ border: "none", fontSize: "20px" }}
					/>
				</div>
				<Button
					icon={bookmarked ? <FaBookmark color="#0984e3" /> : <FaRegBookmark />}
					onClick={handleBookmarkClick}
					className="border-none text-xl"
				/>
			</div>

			<hr style={{ borderColor: "gray", width: "100%", marginTop: "10px" }} />

			<Form>
				<div className="flex items-center mt-2 gap-3">
					<Avatar src={logged.photo} size={40}></Avatar>
					<Item name="commentContent" className="flex-1 mt-4">
						<TextArea
							className="border-none outline-none rounded-full bg-gray-200 pl-4 pt-2 text-gray-600"
							placeholder="Write a comment..."
							autoSize={{ minRows: 1, maxRows: 1 }}
						/>
					</Item>
					<Button
						type="primary"
						htmlType="submit"
						className="bg-blue-500 p-3 rounded-full"
						icon={<SendOutlined />}
					/>
				</div>
			</Form>
		</div>
	);
}

export default Post;

import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, Dropdown, Menu } from "antd";
import ProfilePic from "../../../assets/profile.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
	FaRegHeart,
	FaRegComment,
	FaHeart,
	FaRegBookmark,
	FaBookmark,
} from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { MdReportGmailerrorred } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getFeedPosts, likePost, unlikePost } from "@/storage/feedSlice";
import { debounce } from "lodash";
import { savePost, unsavePost } from "../../postService";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { deletePost } from "@/storage/postsSlice";
import { setPostData } from "@/storage/postDataSlice";
import { reportPost } from "@/storage/reportsSlice";
import { getUserPosts } from "@/storage/profileSlice";

function Post({ post, logged, isBookMarked }) {
	const [user, setUser] = useState({});
	const [postMedia, setPostMedia] = useState([]);
	const [postLikes, setPostLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(
		isBookMarked || post.isSaved || false
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchUser = useCallback(async (userId) => {
		const cachedUserData = localStorage.getItem(`user_${userId}`);
		if (cachedUserData) {
			setUser(JSON.parse(cachedUserData));
		} else {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/users/${userId}`
			);
			localStorage.setItem(`user_${userId}`, JSON.stringify(response.data));
			setUser(response.data);
		}
	}, []);

	const fetchPostMedia = useCallback(async (postId) => {
		const cachedPostMedia = localStorage.getItem(`post_media_${postId}`);
		if (cachedPostMedia) {
			setPostMedia(JSON.parse(cachedPostMedia));
		} else {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/posts/${postId}/media`
			);
			localStorage.setItem(
				`post_media_${postId}`,
				JSON.stringify(response.data.media)
			);
			setPostMedia(response.data.media);
		}
	}, []);

	const fetchPostLikes = useCallback(async (postId) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/posts/${postId}/likes-count`
		);
		setPostLikes(response.data.likesCount);
	}, []);

	const checkIfUserLikedPost = useCallback(async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/posts/${post.id}/has-liked/${logged.id}`
			);
			setLiked(response.data.hasLiked);
		} catch (error) {
			console.error("Error checking if user liked post:", error);
		}
	}, [post.id, logged.id]);

	const handleDelete = () => {
		dispatch(deletePost(post.id));
	};

	useEffect(() => {
		fetchUser(post.user_id);
		fetchPostMedia(post.id);
		fetchPostLikes(post.id);
		checkIfUserLikedPost();
	}, [
		fetchUser,
		fetchPostMedia,
		fetchPostLikes,
		checkIfUserLikedPost,
		post.user_id,
		post.id,
	]);

	const debouncedFetchPostLikes = useCallback(
		debounce(async () => {
			await fetchPostLikes(post.id);
		}, 500),
		[fetchPostLikes, post.id]
	);

	const handleLikeClick = async () => {
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

	const handleBookmarkClick = async () => {
		try {
			if (!bookmarked) {
				const success = await savePost(post.id, logged.id);
				if (success) {
					setBookmarked(true);
				}
			} else {
				const success = await unsavePost(post.id);
				if (success) {
					setBookmarked(false);
				}
			}
		} catch (error) {
			console.error("Error (un)saving post:", error);
		}
	};
	const handleCommentClick = () => {
		const postData = {
			post: post,
			media: postMedia,
			likes: postLikes,
			owner: user,
			userLiked: liked,
			saved: bookmarked,
		};
		dispatch(setPostData(postData));
		navigate(`/post/${post.id}`);
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
			handleDelete();
		} else if (e.key === "report") {
			dispatch(reportPost(post.id));
		}
	};

	let menu;
	if (post.user_id === logged.id) {
		menu = (
			<Menu onClick={handleMenuClick}>
				<Menu.Item key="edit" icon={<EditOutlined />}>
					Edit Post
				</Menu.Item>
				<Menu.Item key="delete" icon={<DeleteOutlined />}>
					Delete Post
				</Menu.Item>
			</Menu>
		);
	} else {
		menu = (
			<Menu onClick={handleMenuClick}>
				<Menu.Item key="report" icon={<MdReportGmailerrorred />}>
					Report Post
				</Menu.Item>
			</Menu>
		);
	}

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
				<Dropdown overlay={menu} trigger={["click"]}>
					<Button
						icon={<MoreOutlined />}
						style={{ border: "none", fontSize: "20px" }}
					/>
				</Dropdown>
			</div>
			<div className="mt-2 mb-5">
				<p className="text-lg text-black mb-2">{post.caption}</p>
				<div className="w-full flex justify-center items-center overflow-hidden">
					<div className="w-full max-w-2xl">
						{postMedia.length > 0 && (
							<div className="flex justify-center items-center">
								<img
									src={postMedia[0].url}
									alt={`Post media`}
									className="h-full object-center"
									style={{
										width: "100%",
									}}
								/>
							</div>
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
						onClick={handleCommentClick}
					/>
					<Button
						icon={<BiRepost className="text-2xl" />}
						style={{ border: "none", fontSize: "20px" }}
					/>
				</div>
				<Button
					icon={bookmarked ? <FaBookmark color="#0984e3" /> : <FaRegBookmark />}
					onClick={handleBookmarkClick}
					className="border-none text-xl"
				/>
			</div>
		</div>
	);
}

export default Post;

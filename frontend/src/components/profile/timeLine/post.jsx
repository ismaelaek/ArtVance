import React, { useState, useEffect } from "react";
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

const { TextArea } = Input;
const { Item } = Form;

function Post({ post, logged }) {
	const [liked, setLiked] = useState(false);
	const [user, setUser] = useState({});
	const [postMedia, setPostMedia] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			try {
				// Check if user data exists in local storage
				const cachedUserData = localStorage.getItem(`user_${post.user_id}`);
				if (cachedUserData) {
					setUser(JSON.parse(cachedUserData));
				} else {
					const response = await axios.get(
						`http://127.0.0.1:8000/api/users/${post.user_id}`
					);
					setUser(response.data);
					// Save user data to local storage
					localStorage.setItem(
						`user_${post.user_id}`,
						JSON.stringify(response.data)
					);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		const getPostMedia = async () => {
			try {
				const cachedPostMedia = localStorage.getItem(`post_media_${post.id}`);
				if (cachedPostMedia) {
					setPostMedia(JSON.parse(cachedPostMedia));
				} else {
					const response = await axios.get(
						`http://127.0.0.1:8000/api/posts/${post.id}/media`
					);
					setPostMedia(response.data.media);
					console.log('fetched')
					localStorage.setItem(
						`post_media_${post.id}`,
						JSON.stringify(response.data.media)
					);
				}
			} catch (error) {
				console.error("Error fetching post media:", error);
			}
		};

		getUser();
		getPostMedia();
	}, [post.user_id, post.id]);


	const handleLikeClick = () => {
		setLiked(!liked);
	};

	const [bookmarked, setBookmarked] = useState(false);
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
						<Carousel
							arrows
							style={{
								height: "600px",
							}}
							className="w-full max-w-2xl overflow-hidden ">
							{postMedia.map((media, index) => (
								<div
									key={index}
									className="flex justify-center items-center"
									>
									<img
										src={media.url}
										alt={`Post ${index + 1}`}
										className="h-full object-center"
										style={{
											width: "100%",
											aspectRatio: '1/1'
										}}
									/>
								</div>
							))}
						</Carousel>
					</div>
				</div>
			</div>

			<hr className=" border-gray-400 w-full mt-2" />

			<div className="flex items-center justify-between">
				<div>
					<Button
						icon={liked ? <FaHeart color="#e84393" /> : <FaRegHeart />}
						onClick={handleLikeClick}
						style={{ border: "none", fontSize: "20px" }}
					/>
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

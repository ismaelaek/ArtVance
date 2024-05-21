import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { FaRegHeart, FaRegComment, FaHeart, FaRegBookmark, FaBookmark    } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import ProfilePic from '../../../assets/profile.jpg';
import Poste1 from '../../../assets/poste1.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Item } = Form;

function Post({post, logged}) {
	const [liked, setLiked] = useState(false);
	const [user, setUser] = useState({});
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/users/${post.user_id}`
				);
				setUser(response.data);
			} catch (error) {
				throw error;
			}
		};
		getUser();
	}, [post.user_id]);
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
	const formattedTime = date
		.toLocaleString("sv-SE", options)
		.replace(",", "");


	return (
		<div className="p-3 rounded-xl mt-12 bg-white">
			<div className="flex items-center">
				<Link className='no-underline' to={`/profile/${post.user_id}`}>
					<img src={avatarSrc} alt="Profile" style={profilePicStyle} />
				</Link>
				<div className="ml-2 mt-3">
					<Link className=" m-0 text-lg no-underline text-black" to={`/profile/${post.user_id}`}>
						{" "}
						{user.nickname}{" "}
					</Link>
					<p style={{ fontSize: "14px", color: "gray" }}>{formattedTime}</p>
				</div>
			</div>

			<div className="mt-2 mb-5">
				<p className="text-lg text-black mb-2">{post.caption}</p>
				<img
					src={Poste1}
					alt="Post"
					style={{
						width: "100%",
						maxHeight: "500px",
						height: "auto",
						borderRadius: "20px",
						aspectRatio: "3/2",
					}}
				/>
			</div>

			<hr
				style={{ borderColor: "gray", width: "100%", marginBottom: "10px" }}
			/>

			<div
				style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
				className="flex items-center justify-between">
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
					style={{ border: "none", fontSize: "20px" }}
				/>
			</div>

			<hr style={{ borderColor: "gray", width: "100%", marginTop: "10px" }} />

			<Form>
				<div
					style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
					<img style={profilePicStyle} src={logged.photo} alt="Profile" />
					<Item name="commentContent" className="flex-1 mt-4">
						<TextArea
							className="border-none outline-none text-lg font-semibold rounded-full bg-gray-200 pl-6 pt-2 pb-2 pr-5 text-gray-600"
							placeholder="Write a comment..."
							autoSize={{ minRows: 1, maxRows: 3 }}
						/>
					</Item>
					<Button
						type="primary"
						htmlType="submit"
						className="bg-blue-500 ml-7 p-4 rounded-full"
						icon={<SendOutlined />}
					/>
				</div>
			</Form>
		</div>
	);
}

export default Post;

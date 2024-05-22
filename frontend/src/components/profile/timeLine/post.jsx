import React, { useState, useEffect } from 'react';
import { Avatar, Button, Form, Input, Dropdown, Menu } from 'antd';
import { SendOutlined, MoreOutlined, EditOutlined, DeleteOutlined   } from '@ant-design/icons';
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

	const handleMenuClick = (e) => {
		if (e.key === 'edit') {
			// Handle edit post action
			console.log('Edit post');
		} else if (e.key === 'delete') {
			// Handle delete post action
			console.log('Delete post');
		}
	};

	const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="edit" icon={<EditOutlined />}>Edit Post</Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>Delete Post</Menu.Item>
        </Menu>
    );

	return (
		<div className="p-3 rounded-xl mt-12 bg-white">
			<div className="flex items-center">
				<img src={avatarSrc} alt="Profile" style={profilePicStyle} />
				<div className="ml-2 mt-3">
					<h6 className=" m-0 text-xl text-black"> {logged.nickname} </h6>
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
				className=' border-gray-400 w-full mt-2'
			/>

			<div
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
					className='border-none text-xl'
				/>
			</div>

			<hr style={{ borderColor: "gray", width: "100%", marginTop: "10px" }} />

			<Form>
				<div
					className='flex items-center mt-2 gap-3'>
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

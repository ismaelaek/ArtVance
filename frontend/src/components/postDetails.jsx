import { Avatar, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	FaRegHeart,
	FaRegComment,
	FaHeart,
	FaRegBookmark,
	FaBookmark,
} from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import axios from "axios";

export default function PostDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const { postData } = useSelector((state) => state.postData);
	const { post, media, likes, owner } = postData;
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState({
		post_id: parseInt(id),
		user_id: logged.id,
		content: "",
	});

	useEffect(() => {
		const getComments = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/posts/${id}/comments`
				);
				setComments(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		getComments();
	}, [id]);

	useEffect(() => {
		if (!post) {
			navigate("/");
		}
	}, [post, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/posts/new-comment",
				newComment, // Send the newComment object directly
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data.message);
			const appendCmnt = {
				id: comments.length + 1,
				...newComment,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user: logged,
			};

			setComments((prevComments) => [...prevComments, appendCmnt]);
			setNewComment({
				...newComment,
				content: "",
			});
		} catch (error) {
			console.log(error.message);
			message.error("Can't post comment!");
		}
	};

	const imgSrc = Array.isArray(media) && media.length > 0 ? media[0].url : "";

	return (
		<main
			className="rounded-xl bg-white h-full p-3 grid gap-6 overflow-auto"
			style={{
				gridTemplateColumns: media?.length === 0 ? "1fr 1fr" : "1fr 0.5fr",
			}}>
			<div className="h-fit overflow-hidden rounded-xl py-2">
				{media?.length !== 0 && (
					<div className="image-container">
						<img src={imgSrc} alt="" className="responsive-image" />
					</div>
				)}
				<hr />
				<div className="flex gap-4 items-center text-lg">
					<span className="flex gap-2 items-center">
						<FaRegHeart /> {likes}
					</span>
					<span>
						<BiRepost className="text-2xl" />
					</span>
					<span>
						<FaRegBookmark />
					</span>
				</div>
				<hr />
				<form
					onSubmit={handleSubmit}
					className="flex gap-2 justify-between mb-3">
					<Input
						type="text"
						name="content"
						value={newComment.content}
						onChange={(e) => {
							setNewComment({ ...newComment, content: e.target.value });
						}}
					/>
					<button className="btn btn-primary">Post</button>
				</form>
			</div>
			<div>
				<div className="flex gap-2 items-center m-0">
					<Avatar src={owner?.photo} size={50} />
					<div>
						<Link
							className="text-black text-xl m-0 no-underline"
							to={`/profile/${owner?.id}`}>
							{owner?.nickname}
						</Link>
						<p className="text-sm m-0 text-gray-500">{post?.created_at}</p>
					</div>
				</div>
				<div>
					<p>{post?.caption}</p>
				</div>
				<hr />
				<div className="comments overflow-auto" style={{ maxHeight: "600px" }}>
					{comments?.map((comment) => {
						return <CommentItem key={comment.id} comment={comment} />;
					})}
				</div>
			</div>
		</main>
	);
}

const CommentItem = ({ comment }) => {
	return (
		<div className="flex gap-3 m-0">
			<Avatar src={comment.user.photo} size={35} className="m-0" />
			<div>
				<p>
					<Link
						className="text-black text-lg m-0 no-underline"
						to={`/profile/${comment.user.id}`}>
						{comment.user.nickname}
					</Link>
				</p>
				<p className="-mt-3">{comment.content}</p>
			</div>
		</div>
	);
};

// CSS for image container and responsive image
const style = document.createElement("style");
style.textContent = `
	.image-container {
		width: 100%;
		overflow: hidden;
	}
	.responsive-image {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		max-height: 560px;
	}
`;
document.head.append(style);

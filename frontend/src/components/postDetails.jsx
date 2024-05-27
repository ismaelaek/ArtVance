import { Avatar, Input, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	FaRegHeart,
	FaHeart,
	FaRegBookmark,
	FaBookmark,
} from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { likePost, unlikePost } from "@/storage/feedSlice";
import { savePost, unsavePost } from "./postService";


export default function PostDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
	const { id } = useParams();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const { postData } = useSelector((state) => state.postData);
	const { post, media, likes, owner, userLiked, saved } = postData;
	const [likesCount, setLikesCount] = useState(likes);
	const [bookmarked, setBookmarked] = useState(saved);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState({
		post_id: parseInt(id),
		user_id: logged.id,
		content: "",
    });
    const [liked, setLiked] = useState(userLiked);
    const handleLikeClick = () => {
			try {
				if (liked) {
					dispatch(unlikePost({ userId: logged.id, postId: id }));
					setLikesCount(prev => prev - 1);
				} else {
					dispatch(likePost({ userId: logged.id, postId: id }));
					setLikesCount((prev) => prev + 1);
				}
				setLiked(!liked);
			} catch (error) {
				console.error("Error toggling like status:", error);
			}
		};

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
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/posts/new-comment",
				newComment,
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

	const handleBookmarkClick = async () => {
		try {
			if (!bookmarked) {
				const success = await savePost(id, logged.id);
				if (success) {
					setBookmarked(true);
				}
			} else {
				const success = await unsavePost(id);
				if (success) {
					setBookmarked(false);
				}
			}
		} catch (error) {
			console.error("Error (un)saving post:", error);
		}
	};

	const imgSrc = Array.isArray(media) && media.length > 0 ? media[0].url : "";

	if (media?.length === 0) {
		return (
			<main
				className="rounded-xl bg-white h-full p-3 grid gap-4 overflow-auto"
				style={{ gridTemplateColumns: "1fr 1fr" }}>
				<div>
					<div className=" flex gap-2 items-center m-0">
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
					<div className="mt-3 min-h-96">
						<p>{post?.caption}</p>
					</div>
					<hr />
					<div className="flex gap-4 items-center text-lg">
						<span className=" flex gap-2 items-center ">
							<Button
								icon={liked ? <FaHeart color="#e84393" /> : <FaRegHeart />}
								onClick={handleLikeClick}
								className=""
								style={{ border: "none", fontSize: "20px" }}
							/>
							{likesCount !== 0 && <span>{likesCount}</span>}
						</span>
						<span>
							<BiRepost className="text-2xl" />
						</span>
						<span>
							<Button
								icon={
									bookmarked ? (
										<FaBookmark color="#0984e3" />
									) : (
										<FaRegBookmark />
									)
								}
								onClick={handleBookmarkClick}
								className="border-none text-xl"
							/>
						</span>
					</div>
					<hr />
					<form
						onSubmit={handleSubmit}
						className="flex gap-2 justify-between mb-3">
						<Input
							type="text"
							name="content"
							onChange={(e) => {
								setNewComment({ ...newComment, content: e.target.value });
							}}
						/>
						<button className=" btn btn-primary">Post</button>
					</form>
				</div>
				<div className=" comments pl-3 overflow-auto ">
					{comments?.length === 0 ? (
						<div className=" w-full flex justify-center">
							<p>No comments yet</p>
						</div>
					) : (
						comments?.map((comment) => {
							return <CommentItem key={comment.id} comment={comment} />;
						})
					)}
				</div>
			</main>
		);
    } else {
        // with media 
		return (
			<main
				className="rounded-xl bg-white h-full p-3 grid gap-6 overflow-auto"
				style={{ gridTemplateColumns: "1fr 0.5fr" }}>
				<div className="h-fit overflow-hidden rounded-xl py-2">
					<div className="flex justify-center">
						<img
							src={imgSrc}
							alt=""
							className="h-full"
							style={{ height: 560, aspectRatio: "auto" }}
						/>
					</div>
					<hr />
					<div className="flex gap-4 items-center text-lg">
						<span className=" flex gap-2 items-center ">
							<Button
								icon={liked ? <FaHeart color="#e84393" /> : <FaRegHeart />}
								onClick={handleLikeClick}
								className=""
								style={{ border: "none", fontSize: "20px" }}
							/>
							{likesCount !== 0 && <span>{likesCount}</span>}
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
						<button className=" btn btn-primary">Post</button>
					</form>
				</div>
				<div>
					<div className=" flex gap-2 items-center m-0">
						<Avatar src={owner?.photo} size={50} />
						<div>
							<Link
								className="text-black text-xl no-underline"
								to={`/profile/${owner?.id}`}>
								{owner?.nickname}
							</Link>
							<p className="text-sm  text-gray-500">{post?.created_at}</p>
						</div>
					</div>
					<div>
						<p>{post?.caption}</p>
					</div>
					<hr className="" />
					<div
						className=" comments overflow-auto"
						style={{ maxHeight: "600px" }}>
						{comments?.length === 0 ? (
							<div className=" w-full flex justify-center">
								<p>No comments yet</p>
							</div>
						) : (
							comments?.map((comment) => {
								return <CommentItem key={comment.id} comment={comment} />;
							})
						)}
					</div>
				</div>
			</main>
		);
	}
}

const CommentItem = ({ comment }) => {
	return (
		<div className=" flex gap-3 m-0">
			<Avatar src={comment.user.photo} size={40} className="m-0" />
			<div>
				<p>
					<Link
						className="text-black text-lg m-0 no-underline font-semibold"
						to={`/profile/${comment.user.id}`}>
						{comment.user.nickname}
					</Link>
				</p>
				<p className="-mt-3">{comment.content}</p>
			</div>
		</div>
	);
};

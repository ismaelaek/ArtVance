import React, { useEffect } from "react";
import ProdImage from "../../assets/product.jpeg";
import ProfilePic from "../../assets/profile.jpg";
import { FaMessage, FaBookmark, FaShare } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProducts } from "@/storage/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/storage/usersSlice";
import { Avatar, message } from "antd";
import axios from "axios";

export default function ProductDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { products } = useSelector((state) => state.products);
	const product = products.find((product) => product.id == id);
	const { targetUser, users } = useSelector((state) => state.users);
	const logged = JSON.parse(localStorage.getItem("loggedUser"));

	useEffect(() => {
		dispatch(getProducts());
		if (product?.user_id) {
			dispatch(getUser(product.user_id));
		}
	}, [dispatch, product?.user_id]);

	const avatarSrc = targetUser.photo ? targetUser.photo : ProfilePic;

	const handleMessageClick = async () => {
		const data = {
			user_id: parseInt(logged.id),
			reciever_id: parseInt(targetUser.id),
		};

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/conversations/start-conversation",
				data
			);
			navigate(`/messages/conversation/${response.data.id}`);
		} catch (error) {
			console.log(error.message);
			message.error("Error starting conversation");
		}
	};

	const handleMessageSend = async (event) => {
		event.preventDefault();
		const messageContent = event.target.message.value;
		const data = {
			user_id: parseInt(logged.id),
			reciever_id: parseInt(targetUser.id),
			content: messageContent,
		};

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/messages/start-messaging",
				data
			);
			message.success("Message sent successfully!");
			event.target.message.value = "";
			
		} catch (error) {
			console.log(error.message);
			message.error("Error sending message");
		}
	};

	return (
		<main className="prod-details h-full">
			<div className="prod-imag h-full overflow-hidden flex justify-center bg-white p-3 rounded-xl">
				<Link
					to="/marketplace"
					className="absolute top-20 left-72 text-black text-2xl x-back">
					<FaTimes />
				</Link>
				<img src={product?.image} alt="" className=" h-full" />
			</div>
			<div className=" bg-white h-full rounded-xl p-3">
				<p className="text-3xl m-0"> {product?.name}</p>
				<p className=" text-xl m-0 font-bold">{product?.price} MAD</p>
				<p className="text-gray-500">
					{" "}
					Listed 5 days ago in <b>Tinghir </b>
				</p>
				<div className="w-full flex flex-nowrap gap-3">
					{logged.id != product.user_id && (
						<button
							className=" btn btn-outline-primary"
							onClick={handleMessageClick}>
							<FaMessage className="inline-block mr-2" />
							<span className="inline-block"> Message</span>
						</button>
					)}
					<button className=" btn btn-outline-dark">
						<FaBookmark className="inline-block mr-2" />
						<span className="inline-block"> Save </span>
					</button>
					<button className=" btn btn-outline-dark">
						<FaShare className="inline-block mr-2" />
						<span className="inline-block"> Share </span>
					</button>
				</div>
				<hr />
				<p className="text-3xl m-0"> Details</p>
				<p className="m-0 max-h-44 overflow-hidden text-justify">
					{product?.description}
				</p>
				<hr />
				<p className="text-3xl m-0"> Seller information</p>
				<div className="flex items-center gap-3 mt-2">
					<Avatar src={avatarSrc} alt="" size={60} />
					<Link
						to={`/profile/${targetUser?.id}`}
						className="no-underline text-black text-xl hover:underline">
						{targetUser?.nickname}
					</Link>
				</div>
				<hr />
				<div className="rounded-lg">
					<div className="mb-2 flex items-center">
						<FaMessage className="mr-2" />
						Send seller a message
					</div>
					<form onSubmit={handleMessageSend}>
						<div className="mb-2">
							<input
								type="text"
								name="message"
								defaultValue="Is this available?"
								className="w-full rounded-xl p-2 h-14 border-black border-solid border-1"
							/>
						</div>
						<button
							type="submit"
							className="w-full btn btn-primary rounded-md py-2">
							Send
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

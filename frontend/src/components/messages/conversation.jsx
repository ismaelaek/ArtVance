import React, { useState, useEffect } from "react";
import { Avatar, Input, Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { TbSend } from "react-icons/tb";



const Conversation = () => {
	const { id } = useParams();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [messages, setMessages] = useState([]);
	const [conversation, setConversation] = useState({});
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		// Fetch conversation details
		const fetchConversation = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/conversations/${id}`
				);
				setConversation(response.data);
			} catch (error) {
				console.error("Error fetching conversation details:", error);
			}
		};

		// Fetch conversation messages
		const fetchMessages = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/conversations/${id}/messages`
				);
				setMessages(response.data);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		fetchConversation();
		fetchMessages();

		// Initialize Pusher
		const pusher = new Pusher("dd1bb8b73c7829afcf7e", {
			cluster: "eu",
		});

		const channel = pusher.subscribe(`chat`);
		channel.bind("message", function (newMsg) {
			setMessages((prevMessages) => [...prevMessages, newMsg]);
		});

		// Cleanup on unmount
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [id]);

	let conversationDetails = {};
	if (conversation?.sender && conversation?.sender.id === logged.id) {
		conversationDetails = conversation?.receiver;
	} else {
		conversationDetails = conversation?.sender;
	}

	const handleMessageSend = async () => {
		if (newMessage.trim() === "") return;

		const newMsg = {
			user_id: logged.id,
			content: newMessage,
			conversation_id: id,
		};

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/send-message",
				newMsg
			);
			setMessages((prevMessages) => [...prevMessages, response.data.message]);
			setNewMessage("");
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<main>
			<div className="flex justify-start gap-4 items-center p-2 shadow-md mb-3">
				<Avatar src={conversationDetails?.photo} size={40} />
				<div>
					<p className="text-xl m-0">{conversationDetails?.nickname}</p>
				</div>
			</div>
			<div className="conversation flex flex-col justify-between">
				<div className="overflow-y-auto overflow-x-hidden">
					{messages?.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.user_id === logged.id ? "justify-end" : "justify-start"
							} mb-2`}>
							<div
								className={`${
									message.user_id === logged.id
										? "bg-blue-500 text-white rounded-s-xl"
										: "bg-gray-300 text-black rounded-e-xl"
								} px-4 py-2 max-w-xs`}>
								{message.content}
							</div>
						</div>
					))}
				</div>
				<Form
					layout="inline"
					className=" w-full flex items-center border-t-2 border-gray-200 py-2 px-4 justify-between"
					onFinish={handleMessageSend}>
					<Form.Item className=" w-4/5">
						<Input
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder="Type a message..."
						/>
					</Form.Item>
					<Form.Item>
						<button
							className=" btn btn-primary flex items-center px-2"
							htmlType="submit"
							disabled={newMessage.trim() === ""}>
							<TbSend />
						</button>
					</Form.Item>
				</Form>
			</div>
		</main>
	);
};

export default Conversation;

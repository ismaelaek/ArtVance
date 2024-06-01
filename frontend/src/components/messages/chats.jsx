import { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ChatItem from "./chatItem";
import axios from "axios";
import { Link } from "react-router-dom";

const Chats = () => {
	const [conversations, setConversations] = useState([]);
	const logged = JSON.parse(localStorage.getItem("loggedUser"));

	useEffect(() => {
		fetchConversations(logged.id);
	}, [logged.id]); 

	const fetchConversations = async (userId) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/conversations/user/${userId}`
			);
            setConversations(response.data); 
            
		} catch (error) {
			console.error("Error fetching conversations:", error);
		}
	};

	return (
		<div>
			<Input
				className="rounded-full p-2"
				placeholder="Search Message..."
				prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
			/>
			<hr />
			<div className="h-full mt-2 cursor-pointer chat-items-container">
				{conversations.map((conversation, index) => (
					<Link className="no-underline text-gray-800 hover:text-gray-700 " key={index} to={`/messages/conversation/${conversation.id}`}>
						<ChatItem conversation={conversation} logged={logged.id} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default Chats;

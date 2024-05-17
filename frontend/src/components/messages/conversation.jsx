import React, { useState } from "react";

const Conversation = () => {
	const [messages, setMessages] = useState([
		{ id: 1, sender: "John", content: "Hello!" },
		{ id: 2, sender: "Jane", content: "Hi John!" },
	]);

	const [newMessage, setNewMessage] = useState("");

	const handleMessageSend = () => {
		if (newMessage.trim() === "") return;

		const newMsg = {
			id: messages.length + 1,
			sender: "John", // Assuming John is sending the message
			content: newMessage,
		};

		setMessages([...messages, newMsg]);
		setNewMessage("");
	};

	return (
		<div className="conversation flex flex-col justify-between">
			<div className="overflow-y-auto px-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender === "John" ? "justify-end" : "justify-start"
						} mb-2`}>
						<div
							className={`${
								message.sender === "John"
									? "bg-blue-500 text-white rounded-s-xl"
									: "bg-gray-300 text-black rounded-e-xl"
							}  px-4 py-2 max-w-xs`}>
							{message.content}
						</div>
					</div>
				))}
			</div>
			<div className="flex items-center border-t-2 border-gray-200 py-2 px-4">
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type a message..."
					className="flex-1 appearance-none rounded-full py-2 px-4 mr-2 focus:outline-none"
				/>
				<button
					onClick={handleMessageSend}
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
					Send
				</button>
			</div>
		</div>
	);
};

export default Conversation;

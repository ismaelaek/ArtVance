import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ChatItem from "./chatItem";

const Messages = () => {
	return (
		<main className="message-main">
			<div className="message-conversation rounded-xl bg-white h-full p-3">
				<h1>Conversation</h1>
			</div>
			<div className=" rounded-xl bg-white p-3">
				<Chats />
			</div>
		</main>
	);
};

export default Messages;

import React from "react";

const Chats = () => {
	return (
		<div>
			<Input
				className="rounded-full p-2"
				placeholder="Search Message..."
				prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
			/>
			<hr />
			<div className="h-full mt-2 cursor-pointer chat-items-container">
				<ChatItem  read={false}/>
				<ChatItem  read={true}/>
				<ChatItem  read={true} />
				<ChatItem  read={false}/>
				<ChatItem  read={false}/>
			</div>
		</div>
	);
};



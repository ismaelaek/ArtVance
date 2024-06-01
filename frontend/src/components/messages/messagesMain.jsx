import Conversation from "./conversation";
import Chats from "./chats";

const Messages = () => {
	return (
		<main className="message-main">
			<div className="message-conversation rounded-xl bg-white h-full p-3">
				<Conversation/>
			</div>
			<div className=" rounded-xl bg-white p-3">
				<Chats />
			</div>
		</main>
	);
};

export default Messages;

import React from "react";




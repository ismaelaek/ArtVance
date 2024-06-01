import Chats from "./chats";

const EmptyMessages = () => {
	return (
		<main className="message-main">
			<div className="message-conversation rounded-xl flex justify-center items-center bg-white h-full p-3">
                <h3>
                    tap on a conversation to start chatting
                </h3>
			</div>
			<div className=" rounded-xl bg-white p-3">
				<Chats />
			</div>
		</main>
	);
};

export default EmptyMessages;

import React from "react";

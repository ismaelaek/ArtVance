import Chats from "./chats";
import axios from "axios";

const EmptyMessages = () => {
	useEffect(() => {
		const deletEmptyConv = async () => {
			try {
				await axios.delete(
					"http://127.0.0.1:8000/api/conversations/delete-empty-conv"
				);
			} catch (error) {
				console.log(error.message);
			}
		}
		deletEmptyConv();
	},[])
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

import React, { useEffect } from "react";

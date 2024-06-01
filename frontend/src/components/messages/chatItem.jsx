import ProfilePic from "../../assets/profile.jpg";
import { Avatar } from "antd";

const ChatItem = ({ conversation, logged }) => {
	const read = false; 
	let datails = {};
	if (conversation.sender.id == logged) {
		datails = conversation.receiver;
	} else {
		datails = conversation.sender;
	}

	return (
		<div className=" flex gap-6 items-center ">
			<div className="rounded-full overflow-hidden  ">
				<Avatar src={datails?.photo} alt="" width={100} size={60} />
			</div>
			<div className="mt-3">
				<p className={`text-lg m-0 p-0 ${!read ? "font-bold" : " "}`}>
					{datails.nickname}
				</p>
				<p>
					tap to chat
				</p>
			</div>
		</div>
	);
};
export default ChatItem;

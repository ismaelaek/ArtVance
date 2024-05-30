import ProfilePic from "../../assets/profile.jpg";
import { Avatar } from "antd";

const ChatItem = ({ read }) => {
	return (
		<div className=" flex gap-6 items-center ">
			<div className="rounded-full overflow-hidden  ">
				<Avatar
					src={ProfilePic}
					alt=""
					width={100}
					size={60}
				/>
			</div>
			<div className="mt-3">
				<p className={`text-lg m-0 p-0 ${!read ? "font-bold" : " "}`}>
					John Doe
				</p>
				<p
					className={`h-6 text-sm  overflow-hidden ${
						!read ? "font-bold" : " text-gray-500"
					}`}>
					Hello, I love your art !!
				</p>
			</div>
			<div className={`h-2 w-2 rounded-full ${!read ? 'bg-blue-600' : ''}`}></div>
		</div>
	);
};
export default ChatItem;

import ProfilePic from "../../assets/profile.jpg";

const ChatItem = ({ read }) => {
	return (
		<div className=" flex gap-6 items-center ">
			<div className="rounded-full overflow-hidden  ">
				<img
					src={ProfilePic}
					alt=""
					width={100}
					className=" h-full ratio-1x1"
				/>
			</div>
			<div className="mt-3">
				<p className={`text-lg m-0 p-0 ${!read ? "font-bold" : " "}`}>
					Ahmed Mouhssine
				</p>
				<p
					className={`h-6 text-sm  overflow-hidden ${
						!read ? "font-bold" : " text-gray-500"
					}`}>
					Wech a khayna jhdsahfhsdf sdf hsdg fhsgd fhdsg hhhhhh
				</p>
			</div>
			<div className={`h-2 w-4 rounded-full ${!read ? 'bg-blue-600' : ''}`}></div>
		</div>
	);
};
export default ChatItem;

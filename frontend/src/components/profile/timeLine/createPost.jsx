import React from "react";
import { Upload, Button, Form, Input } from "antd";
import { VideoCameraOutlined, PictureOutlined } from "@ant-design/icons";
import ProfilePic from "../../../assets/profile.jpg";

const { Item } = Form;

function CreatePost() {
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const avatarSrc = logged.photo ? logged.photo : ProfilePic;

	const profilePicStyle = {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		marginRight: "10px",
		marginTop: "20px",
	};

	return (
		<Form className="bg-white px-2 rounded-xl">
			<div className="flex items-center p-1">
				<img style={profilePicStyle} src={avatarSrc} alt="Profile" />
				<Item name="caption" className="flex-1 mt-5">
					{/* //! dert caption bach tb9ab nesf smya m3a dakchi li f table  */}
					<Input
						className="border-none outline-none h-14 text-lg rounded-xl bg-gray-200 px-3 py-2 text-gray-600"
						placeholder="What's happening ?"
					/>
				</Item>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex w-1/3 justify-evenly">
					<Upload accept="video/*" showUploadList={false}>
						<Button icon={<VideoCameraOutlined />}>Video</Button>
					</Upload>
					<Upload accept="image/*" showUploadList={false}>
						<Button icon={<PictureOutlined />}>Photo</Button>
					</Upload>
				</div>
				<Item>
					<Button type="primary" htmlType="submit" className=" bg-blue-500 ">
						Post
					</Button>
				</Item>
			</div>
		</Form>
	);
}

export default CreatePost;

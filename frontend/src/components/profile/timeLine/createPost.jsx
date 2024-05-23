import React, { useState } from "react";
import { Upload, Button, Form, Input, Checkbox } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import ProfilePic from "../../../assets/profile.jpg";
import { addPost } from "@/storage/feedSlice";
import { useDispatch } from "react-redux";

const { Item } = Form;

function CreatePost() {
	const [mediaFiles, setMediaFiles] = useState([]);
	const [formValues, setFormValues] = useState({
		caption: "",
		isForSale: false,
	});

	const dispatch = useDispatch();
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const avatarSrc = logged.photo ? logged.photo : ProfilePic;

	const profilePicStyle = {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		marginRight: "10px",
		marginTop: "20px",
	};

	const handleMediaChange = ({ fileList }) => {
		setMediaFiles(fileList.map((file) => file.originFileObj));
	};

	const handleSubmit = () => {
		const payload = {
			...formValues,
			media: mediaFiles,
		};
		console.log(payload);
		dispatch(addPost(payload));
	};

	const handleFormChange = (changedValues) => {
		setFormValues((prevValues) => ({
			...prevValues,
			...changedValues,
		}));
	};

	return (
		<Form
			className="bg-white px-2 rounded-xl"
			onFinish={handleSubmit}
			onValuesChange={handleFormChange}
			initialValues={{ isForSale: false }}>
			<div className="flex items-center p-1">
				<img style={profilePicStyle} src={avatarSrc} alt="Profile" />
				<Item name="caption" className="flex-1 mt-5">
					<Input
						className="border-none outline-none h-14 text-lg rounded-xl bg-gray-200 px-3 py-2 text-gray-600"
						placeholder="What's happening?"
					/>
				</Item>
			</div>

			<Upload
				accept="image/*,video/*"
				multiple
				beforeUpload={() => false}
				fileList={mediaFiles.map((file) => ({
					uid: file.uid || file.name,
					name: file.name,
					status: "done",
					url: URL.createObjectURL(file),
				}))}
				onChange={handleMediaChange}
				listType="picture-card"
				className="w-full p-1">
				<Button icon={<PictureOutlined />}>Media</Button>
			</Upload>

			<Item name="isForSale" valuePropName="checked">
				<Checkbox>Is this for sale?</Checkbox>
			</Item>

			<div className="flex justify-end">
				<Item>
					<Button type="primary" htmlType="submit" className="bg-blue-500">
						Post
					</Button>
				</Item>
			</div>
		</Form>
	);
}

export default CreatePost;

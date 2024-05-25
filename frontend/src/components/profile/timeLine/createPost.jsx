import React, { useState } from "react";
import { Upload, Button, Form, Input, Checkbox, Avatar, Image } from "antd";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import ProfilePic from "../../../assets/profile.jpg";
import { addPost } from "@/storage/feedSlice";
import { useDispatch } from "react-redux";
import { getUserPosts } from "@/storage/profileSlice";

const { Item } = Form;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function CreatePost() {
	const [mediaFile, setMediaFile] = useState(null);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [formValues, setFormValues] = useState({
		caption: "",
		user_id: logged.id,
		isForSale: "0",
	});

	const dispatch = useDispatch();

	const avatarSrc = logged.photo ? logged.photo : ProfilePic;

	const handleMediaChange = async ({ fileList }) => {
		const file = fileList.length > 0 ? fileList[0].originFileObj : null;
		setMediaFile(file);
		if (file) {
			const base64 = await getBase64(file);
			setPreviewImage(base64);
		} else {
			setPreviewImage("");
		}
	};

	const handleCheckboxChange = (e) => {
		const newValue = e.target.checked ? "1" : "0";
		setFormValues({ ...formValues, isForSale: newValue });
	};

	const handleSubmit = () => {
		const payload = mediaFile
			? { ...formValues, media: mediaFile }
			: formValues;
		dispatch(addPost(payload));
		setFormValues({
			caption: "",
			isForSale: "0",
		});
		dispatch(getUserPosts(logged.id))
	};

	const handleFormChange = (changedValues) => {
		setFormValues((prevValues) => ({ ...prevValues, ...changedValues }));
	};

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: "none",
			}}
			type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<Form
			className="bg-white p-4 rounded-xl shadow-md"
			onFinish={handleSubmit}
			onValuesChange={handleFormChange}
			initialValues={{caption: "",isForSale: "0" }}
			style={{
				margin: "auto",
				borderRadius: "12px",
				border: "1px solid #e5e5e5",
			}}>
			<div className="flex items-center gap-2 mb-4">
				<Avatar size={60} src={avatarSrc} alt="profile picture" />
				<Item name="caption" className="flex-1 mb-0">
					<Input
						value={formValues.caption}
						className="border-none outline-none h-14 text-lg rounded-xl bg-gray-100 px-4 py-2 text-gray-700"
						placeholder="What's happening?"
					/>
				</Item>
			</div>

			<div className="mb-2">
				<Upload
					accept="image/*,video/*"
					listType="picture-card"
					fileList={
						mediaFile
							? [
									{
										uid: mediaFile.uid || mediaFile.name,
										name: mediaFile.name,
										status: "done",
										url: previewImage,
									},
							]
							: []
					}
					onChange={handleMediaChange}
					beforeUpload={() => false}
					onPreview={() => setPreviewOpen(true)}>
					{mediaFile ? null : uploadButton}
				</Upload>
				{previewImage && (
					<Image
						wrapperStyle={{ display: "none" }}
						preview={{
							visible: previewOpen,
							onVisibleChange: (visible) => setPreviewOpen(visible),
							afterOpenChange: (visible) => !visible && setPreviewImage(""),
						}}
						src={previewImage}
					/>
				)}
			</div>

			<Item name="isForSale">
				<Checkbox defaultChecked={formValues.isForSale==='1'} onChange={handleCheckboxChange}>Is this for sale?</Checkbox>
			</Item>

			<div className="flex justify-end">
				<Item>
					<Button
						type="primary"
						htmlType="submit"
						className="bg-blue-600 text-white">
						Post
					</Button>
				</Item>
			</div>
		</Form>
	);
}

export default CreatePost;

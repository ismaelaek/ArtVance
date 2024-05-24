import React, { useState } from "react";
import { Upload, Button, Form, Input, Checkbox, Modal } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import ProfilePic from "../../../assets/profile.jpg";
import { addPost } from "@/storage/feedSlice";
import { useDispatch } from "react-redux";

const { Item } = Form;

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


	const profilePicStyle = {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		marginRight: "10px",
	};

	const handleMediaChange = ({ fileList }) => {
		const file = fileList.length > 0 ? fileList[0].originFileObj : null;
		setMediaFile(file);
		if (file) {
			setPreviewImage(URL.createObjectURL(file));
		} else {
			setPreviewImage("");
		}
	};

	const handleSubmit = () => {
		const payload = mediaFile
			? { ...formValues, media: mediaFile }
			: formValues;
		dispatch(addPost(payload));
	};

	const handleFormChange = (changedValues) => {
		setFormValues((prevValues) => ({ ...prevValues, ...changedValues }));
	};

	return (
		<Form
			className="bg-white p-4 rounded-xl shadow-md"
			onFinish={handleSubmit}
			onValuesChange={handleFormChange}
			initialValues={{ isForSale: "0" }}
			style={{
				margin: "auto",
				borderRadius: "12px",
				border: "1px solid #e5e5e5",
			}}>
			<div className="flex items-center mb-4">
				<img style={profilePicStyle} src={avatarSrc} alt="Profile" />
				<Item name="caption" className="flex-1 mb-0">
					<Input
						className="border-none outline-none h-14 text-lg rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
						placeholder="What's happening?"
					/>
				</Item>
			</div>

			<div className="mb-4">
				<Upload
					accept="image/*,video/*"
					beforeUpload={() => false}
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
					onPreview={() => setPreviewOpen(true)}
					listType="picture-card"
					className="upload-list-inline"
					style={{ display: "flex", justifyContent: "center" }}>
					{!mediaFile && (
						<Button
							icon={<PictureOutlined />}
							style={{
								backgroundColor: "#0070F3",
								color: "white",
								borderRadius: "6px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: "100px",
								width: "100px",
							}}>
							Add Media
						</Button>
					)}
				</Upload>
			</div>

			<Modal
				visible={previewOpen}
				footer={null}
				onCancel={() => setPreviewOpen(false)}>
				<img alt="preview" style={{ width: "100%" }} src={previewImage} />
			</Modal>

			<Item name="isForSale" valuePropName="checked" className="mb-4">
				<Checkbox>Is this for sale?</Checkbox>
			</Item>

			<div className="flex justify-end">
				<Item>
					<Button
						type="primary"
						htmlType="submit"
						className="bg-blue-600 text-white "
						>
						Post
					</Button>
				</Item>
			</div>
		</Form>
	);
}

export default CreatePost;

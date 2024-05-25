import React, { useState } from "react";
import {
	Form,
	Input,
	Upload,
	Button,
	message,
	Avatar,
	InputNumber,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import placeHolder from "../../assets/photoplaceholder.png";
import { useDispatch } from "react-redux";
import { addProduct } from "@/storage/productsSlice";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

export default function AddProduct() {
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
		imageList: [],
		user_id : logged.id
	});
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const onFinish = () => {
		dispatch(addProduct(formData))
			.then(() => {
				message.success("Product added successfully!");
				console.log(formData);
			})
			.catch((error) => {
				message.error("Failed to add product: " + error.message);
			});
	};


	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const handleFormChange = (changedValues, allValues) => {
		setFormData({ ...formData, ...allValues });
	};

	const handleImageUpload = (info) => {
		const { status } = info.file;
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
			setFormData({ ...formData, imageList: [info.file.originFileObj] });
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	return (
		<main
			className="grid bg-white gap-3 rounded-xl p-3"
			style={{ gridTemplateColumns: "0.5fr 1fr" }}>
			<div className="p-3">
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout="vertical"
					onValuesChange={handleFormChange}>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{ required: true, message: "Please input the product name!" },
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						label="Price"
						name="price"
						rules={[
							{ required: true, message: "Please input the product price!" },
							{ type: "number", message: "Price must be a number!" },
						]}>
						<InputNumber precision={0} style={{ width: "100%" }} />
					</Form.Item>

					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								required: true,
								message: "Please input the product description!",
							},
						]}>
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item
						label="Upload"
						name="image"
						rules={[{ required: true, message: "Please upload an image!" }]}>
						<Upload
							beforeUpload={() => false}
							listType="picture"
							onChange={handleImageUpload}
							fileList={formData.imageList}>
							<Button icon={<InboxOutlined />}>Add image</Button>
						</Upload>
					</Form.Item>

					<Form.Item>
						<Button className="btn btn-primary" htmlType="submit">
							Add Listing
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div>
				<h3>Preview</h3>
				<div
					className="grid gap-3 opacity-40"
					style={{ gridTemplateColumns: "1fr 0.5fr" }}>
					<div className="rounded-xl overflow-hidden w-full ratio-1x1">
						{formData.imageList.length > 0 ? (
							<img
								src={URL.createObjectURL(formData.imageList[0])}
								alt=""
								className="w-full"
							/>
						) : (
							<img src={placeHolder} alt="" className="w-full" />
						)}
					</div>
					<div>
						<h3>{formData.name ? formData.name : "Name"}</h3>
						<p className="text-xl m-0 font-bold">
							{formData.price ? formData.price : "00.00"} MAD
						</p>
						<p className="text-gray-500">
							Listed 5 days ago in <b>Tinghir </b>
						</p>
						<hr />
						<p className="text-3xl m-0"> Details</p>
						<p className="m-0 max-h-44 overflow-hidden text-justify">
							{formData.description
								? formData.description
								: "Description goes here"}
						</p>
						<hr />
						<p className="text-3xl m-0"> Seller information</p>
						<div className="flex items-center gap-3 mt-2">
							<Avatar src={logged.photo} alt="" size={50} />
							<p className="text-xl">{logged.nickname}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

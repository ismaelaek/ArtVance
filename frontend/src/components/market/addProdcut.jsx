import React, { useState } from "react";
import { Form, Input, Button, message, Avatar, InputNumber, Modal } from "antd";
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
		image: null,
		user_id: logged.id,
	});
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = () => {
		if (!formData.image) {
			message.error("Please upload an image!");
			return;
		}

		const productData = new FormData();
		productData.append("name", formData.name);
		productData.append("price", formData.price);
		productData.append("description", formData.description);
		productData.append("user_id", formData.user_id);
		productData.append("image", formData.image);

		dispatch(addProduct(productData))
			.then(() => {
				message.success("Product added successfully!");
				// navigate("/path-to-redirect");
			})
			.catch((error) => {
				message.error("Failed to add product: " + error.message);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const handleFormChange = (changedValues, allValues) => {
		setFormData((prevState) => ({
			...prevState,
			...allValues,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prevState) => ({ ...prevState, image: file }));
			setPreviewImage(URL.createObjectURL(file));
			setPreviewTitle(file.name);
		}
	};

	const handlePreview = () => {
		setPreviewVisible(true);
	};

	const handleCancel = () => setPreviewVisible(false);

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
					onValuesChange={(_, allValues) => handleFormChange(null, allValues)}>
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
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
						/>
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
					className="grid gap-3"
					style={{ gridTemplateColumns: "1fr 0.5fr" }}>
					<div className="rounded-xl overflow-hidden w-full ratio-1x1">
						{formData.image ? (
							<img
								src={previewImage}
								alt="Product"
								className="w-full h-auto rounded"
								onClick={handlePreview}
								style={{ cursor: "pointer" }}
							/>
						) : (
							<img
								src={placeHolder}
								alt="Placeholder"
								className="w-full h-auto rounded"
							/>
						)}
					</div>
					<div>
						<h3>{formData.name || "Name"}</h3>
						<p className="text-xl m-0 font-bold">
							{formData.price ? `${formData.price} MAD` : "00.00 MAD"}
						</p>
						<p className="text-gray-500">
							Listed 5 days ago in <b>Tinghir</b>
						</p>
						<hr />
						<p className="text-3xl m-0"> Details</p>
						<p className="m-0 max-h-44 overflow-hidden text-justify">
							{formData.description || "Description goes here"}
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

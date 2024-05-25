import React from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import "tailwindcss/tailwind.css";

function ChangePassword({ onClose }) {
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const token = Cookies.get("userToken");

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/change-password",
				{
					current_password: values.currentPassword,
					password: values.newPassword,
					password_confirmation: values.confirmNewPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data.error) {
				message.error(response.data.error);
			} else {
				message.success(response.data.message);
				onClose(); 
			}
		} catch (error) {
			message.error("Error changing password:");
		}
	};

	return (
		<div className="bg-white p-6 rounded-xl w-full max-w-md">
			<div className="flex justify-center mb-4">
				<LockOutlined className="text-indigo-300 text-8xl" />
			</div>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Form.Item
							label={
								<span className="font-semibold text-gray-600">
									Current Password
								</span>
							}
							name="currentPassword"
							rules={[
								{
									required: true,
									message: "Please input your current password!",
								},
							]}>
							<Input.Password placeholder="Enter your current password" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label={
								<span className="font-semibold text-gray-600">
									New Password
								</span>
							}
							name="newPassword"
							rules={[
								{ required: true, message: "Please input your new password!" },
								{
									min: 8,
									message: "Password should be at least 8 chars long!",
								},
							]}>
							<Input.Password placeholder="Enter your new password" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label={
								<span className="font-semibold text-gray-600">
									Confirm New Password
								</span>
							}
							name="confirmNewPassword"
							dependencies={["newPassword"]}
							rules={[
								{
									required: true,
									message: "Please confirm your new password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("newPassword") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The two passwords do not match!")
										);
									},
								}),
							]}>
							<Input.Password placeholder="Confirm your new password" />
						</Form.Item>
					</Col>
					<Col span={24} className="text-right">
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="bg-indigo-300 hover:bg-indigo-400">
								Change Password
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
}

export default ChangePassword;

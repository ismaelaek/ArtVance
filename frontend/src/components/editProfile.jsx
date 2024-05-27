import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Row,
	Col,
	Upload,
	message,
} from "antd";
import {
	UserOutlined,
	MailOutlined,
	PhoneOutlined,
	HomeOutlined,
	EditOutlined,
} from "@ant-design/icons";
import ProfilePic from "../assets/profile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUser } from "@/storage/usersSlice";
import moment from "moment";
import axios from "axios";
import { formatDate } from "@/lib/utils";
const { TextArea } = Input;
const { Option } = Select;

function EditProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { users } = useSelector((state) => state.users);
	const logged = JSON.parse(localStorage.getItem("loggedUser"));

	const [profilePic, setProfilePic] = useState(
		logged.photo ? logged.photo : ProfilePic
	);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch, id]);

	const usedUsernames = users
		.filter((user) => user.username !== logged.username)
		.map((user) => user.username);
	const usedEmails = users
		.filter((user) => user.email !== logged.email)
		.map((user) => user.email);

	const onFinish = async (values) => {
		try {
			const formData = new FormData();
			console.log(logged.birthday, "before");
			const formattedDate = formatDate(values.birthday);
			console.log(formattedDate);
			formData.append("username", values.username);
			formData.append("nickname", values.nickname);
			formData.append("email", values.email);
			formData.append("phone", values.phone);
			formData.append("birthday", formattedDate);
			formData.append("gender", values.gender);
			formData.append("address", values.address);
			formData.append("bio", values.bio);

			const response = await axios.put(
				`http://127.0.0.1:8000/api/users/${id}/updateProfile`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			message.success("Profile updated successfully");

			const updatedUser = { ...logged, ...response.data.user };
			localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
			navigate(`/profile/${id}`);
		} catch (error) {
			console.log(error.message);
			message.error("Profile update failed. Please try again.");
		}
	};

	return (
		<main className="bg-gray-100 flex items-center justify-center">
			<div className="bg-white py-20 shadow-lg w-full rounded-xl">
				<Form
					layout="vertical"
					onFinish={onFinish}
					initialValues={{
						nickname: logged.nickname,
						username: logged.username,
						email: logged.email,
						phone: logged.phone,
						birthday: moment(logged.birthday),
						gender: logged.gender,
						address: logged.address,
						bio: logged.bio,
					}}>
					<Row gutter={[16, 16]}>
						<Col span={5}>
							<Form.Item name="photo">
								<div className="relative w-32 h-32 mx-auto">
									<img
										className="w-full h-full rounded-full object-cover"
										src={profilePic}
										alt="Profile"
										style={{
											boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
										}}
									/>
								</div>
							</Form.Item>
						</Col>
						<Col span={9}>
							<Row gutter={[16, 16]}>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">
												Nickname
											</span>
										}
										name="nickname"
										rules={[
											{
												required: true,
												message: "Please enter your nickname!",
											},
										]}>
										<Input
											suffix={<UserOutlined />}
											placeholder="Enter your nickname"
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">
												Username
											</span>
										}
										name="username"
										rules={[
											{
												required: true,
												message: "Please enter your username!",
											},
											{
												min: 6,
												message: "Username must be at least 6 characters long!",
											},
											{
												pattern: /^[a-zA-Z0-9_.]+$/,
												message:
													"Username can only contain letters, numbers, underscore, and dot!",
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (usedUsernames.includes(value)) {
														return Promise.reject(
															new Error("Username is already taken!")
														);
													}
													return Promise.resolve();
												},
											}),
										]}>
										<Input
											suffix={<UserOutlined />}
											placeholder="Enter your username"
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">Email</span>
										}
										name="email"
										rules={[
											{
												type: "email",
												message: "Please enter a valid email address!",
											},
											{ required: true, message: "Please enter your email!" },
											({ getFieldValue }) => ({
												validator(_, value) {
													if (usedEmails.includes(value)) {
														return Promise.reject(
															new Error("Email is already taken!")
														);
													}
													return Promise.resolve();
												},
											}),
										]}>
										<Input
											suffix={<MailOutlined />}
											placeholder="Enter your email"
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">Phone</span>
										}
										name="phone">
										<Input
											suffix={<PhoneOutlined />}
											placeholder="Enter your phone number"
										/>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						<Col span={9}>
							<Row gutter={[16, 16]}>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">
												Birthday
											</span>
										}
										name="birthday">
										<DatePicker
											className="w-full"
											placeholder="Select your birthday"
											format="YYYY-MM-DD"
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">
												Gender
											</span>
										}
										name="gender">
										<Select placeholder="Select your gender" className="w-full">
											<Option value="F">Female</Option>
											<Option value="M">Male</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">
												Address
											</span>
										}
										name="address">
										<Input
											suffix={<HomeOutlined />}
											placeholder="Enter your address"
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label={
											<span className="font-semibold text-gray-600">Bio</span>
										}
										name="bio">
										<TextArea rows={4} placeholder="Tell us about yourself" />
									</Form.Item>
								</Col>
								<Col span={24} className="text-right">
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											className="w-32 bg-blue-500">
											Update
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
				</Form>
			</div>
		</main>
	);
}

export default EditProfile;

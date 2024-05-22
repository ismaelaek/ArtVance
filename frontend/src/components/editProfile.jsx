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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUser } from "@/storage/usersSlice";
import moment from "moment";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;
const { Option } = Select;

function EditProfile() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { targetUser, users } = useSelector((state) => state.users);

	const [profilePic, setProfilePic] = useState(ProfilePic);

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getUser(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (targetUser?.photo) {
			setProfilePic(targetUser.photo);
		}
	}, [targetUser]);

	const usedUsernames = users
		.filter((user) => user.username !== targetUser?.username)
		.map((user) => user.username);
	const usedEmails = users
		.filter((user) => user.email !== targetUser?.email)
		.map((user) => user.email);

	const onFinish = async (values) => {
        console.log(values);
	};

	const handleUpload = ({ file }) => {
		const reader = new FileReader();
		reader.onload = () => {
			setProfilePic(reader.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<main className="bg-gray-100 flex items-center justify-center">
			<div className="bg-white py-20 shadow-lg w-full rounded-xl">
				<Form
					layout="vertical"
					onFinish={onFinish}
					initialValues={{
						nickname: targetUser?.nickname,
						username: targetUser?.username,
						email: targetUser?.email,
						phone: targetUser?.phone,
						birthday: targetUser?.birthday ? moment(targetUser.birthday) : null,
						gender: targetUser?.gender,
						address: targetUser?.address,
						bio: targetUser?.bio,
					}}>
					<Row gutter={[16, 16]}>
						<Col span={5}>
							<Form.Item name="photo">
								<div className="relative w-32 h-32 mx-auto">
									<img
										className="w-full h-full rounded-full object-cover"
										src={profilePic}
										alt="Profile"
									/>
									<ImgCrop>
										<Upload
											className="absolute bottom-0 right-0"
											showUploadList={false}
											accept=".png,.jpg,.jpeg"
											beforeUpload={(file) => {
												handleUpload({ file });
												return false; // Prevents upload
											}}>
											<Button
												className="bg-white text-gray-500 p-1 rounded-full shadow hover:bg-gray-200"
												icon={<EditOutlined />}
												style={{
													position: "absolute",
													bottom: "-2px",
													right: "-2px",
													zIndex: 1,
												}}
											/>
										</Upload>
									</ImgCrop>
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

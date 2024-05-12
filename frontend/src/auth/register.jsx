import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Logo from "../assets/logo.png";

const Register = () => {
	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/auth/register",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			message.success("You have been registered successfully");
			localStorage.setItem("user", JSON.stringify(response.data.user));
			navigate("/home");
		} catch (error) {
			message.error("Registration failed. Please try again.");
		}
	};

	return (
		<section className="vh-100 flex justify-between items-center p-8">
			<div
				className="card w-2/4"
				style={{
					borderRadius: "15px",
					backgroundColor: "rgba(255, 255, 255, 0.5)",
				}}>
				<div className="card-body px-5">
					<Form
						name="register"
						onFinish={onFinish}
						layout="vertical"
						scrollToFirstError>
						<Form.Item
							name="name"
							label="Name"
							rules={[
								{
									required: true,
									message: "Please enter your name!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									type: "email",
									message: "Please enter a valid email address!",
								},
								{
									required: true,
									message: "Please enter your email!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: "Please enter your password!",
								},
								{
									min: 8,
									message: "Password must be at least 8 characters long!",
								},
							]}
							hasFeedback>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="password_confirmation"
							label="Confirm Password"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The two passwords do not match!")
										);
									},
								}),
							]}>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="phone"
							label="Phone"
							rules={[
								{
									required: true,
									message: "Please enter your phone number!",
								},
								{
									min: 10,
									message: "phone should be 10 digits long",
								},
								{
									max: 10,
									message: "phone number is too long!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" className="w-full">
								Register
							</Button>
						</Form.Item>
					</Form>
					<div className="text-center mt-2">
						<p>
							Already have an account? <Link to="/login">Log in</Link>
						</p>
					</div>
				</div>
			</div>
			<div className="2/4 mr-10">
				{/* <img src={Logo} alt="Logo" width={400} /> */}
				<h3>Discover your city with no gasoline</h3>
				<p className="mt-2 text-center">
					Find out where your city is and how to get there
				</p>
			</div>
		</section>
	);
};

export default Register;

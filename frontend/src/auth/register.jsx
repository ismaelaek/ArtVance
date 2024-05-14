import React, {useEffect} from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Hobbies from "../assets/Hobbies.png";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import '../styles/login.css'
import Logo from "../assets/artvance_logo.png";
import { getUsers } from "@/storage/usersSlice";
import { useDispatch, useSelector } from "react-redux";



const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate();

	const { users, usersIsLoading } = useSelector(state => state.users)

	const usedUsernames = [... users.map((item) => {
		return item.username;
	})]
	const usedEmail = [
		...users.map((item) => {
			return item.email;
		}),
	];
	
	useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

	const onFinish = async (values) => {
		console.log(values);
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
		<section className="vh-100  flex  justify-center items-center p-8 ">
			<div className=" w-2/3 bg-white grid grid-cols-2 rounded-2xl overflow-hidden">
				<div className="p-3 text-center">
					<div className="h-12 flex justify-center">
						<img src={Logo} alt="logo" className="h-full" />
					</div>
					<h3>Create new account</h3>
					<Form
						name="register"
						onFinish={onFinish}
						layout="vertical"
						className="pt-3"
						scrollToFirstError>
						<Form.Item
							name="nickname"
							rules={[
								{
									required: true,
									message: "Please enter your nickname!",
								},
							]}>
							<Input placeholder="nickname" />
						</Form.Item>

						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "Please enter your a username!",
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
							<Input placeholder="Username" />
						</Form.Item>

						<Form.Item
							name="email"
							rules={[
								{
									type: "email",
									message: "Please enter a valid email address!",
								},
								{
									required: true,
									message: "Please enter your email!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (usedEmail.includes(value)) {
											return Promise.reject(
												new Error("Email is already taken! Sign in instead ?")
											);
										}
										return Promise.resolve();
									},
								}),
							]}>
							<Input placeholder="Email" />
						</Form.Item>

						<Form.Item
							name="password"
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
							<Input.Password placeholder="Password" />
						</Form.Item>

						<Form.Item
							name="password_confirmation"
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
							<Input.Password placeholder="Confirm Password" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="mt-2 bg-blue-500 w-full">
								Create account
							</Button>
						</Form.Item>
					</Form>
					<p> Or sign up with</p>
					<div className=" social-icons flex gap-4 justify-center text-2xl">
						<button className="text-red-600">
							<FaGoogle />
						</button>

						<button className="text-blue-700">
							<FaFacebook />
						</button>

						<button className="text-blue-500">
							<FaTwitter />
						</button>
					</div>
					<p className="text-center mt-4">
						Alredy have an account? <Link to="/login">Log in</Link>
					</p>
				</div>
				<div className="flex items-center justify-center w-full">
					<img src={Hobbies} alt="" />
				</div>
			</div>
		</section>
	);
};

export default Register;

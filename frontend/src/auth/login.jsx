import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message, Form, Input, Button } from "antd";
import "../styles/login.css";
import Cookies from "js-cookie";
import Logo from "../assets/artvance_logo.png";
import {FaGoogle, FaFacebook, FaTwitter} from 'react-icons/fa'

const Login = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm(); 

	const handleSubmit = async (values) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/auth/login",
				values 
			);
			const user = response.data.user;
			if (user.isAdmin) {
				Cookies.set("token", response.data.token, { expires: 7, secure: true });
				message.success("Logged in as admin");
				navigate("/dashboard");
			} else {
				localStorage.setItem("loggedUser", JSON.stringify(user));
				Cookies.set("userToken", response.data.token, {
					expires: 7,
					secure: true,
				});
				message.success("Login Successful");
				navigate("/");
			}
		} catch (error) {
			message.error("Invalid email or password. Please try again.");
		}
	};

	return (
		<section className="vh-100 flex justify-center items-center p-8">
			<div className=" overflow-hidden w-2/3 rounded-3xl grid grid-cols-2 bg-white">
				<div className="login-bg-image"></div>
				<div className="p-5 text-center">
					<div className="h-12 flex justify-center">
						<img src={Logo} alt="logo" className="h-full" />
					</div>
					<h3>Login to your account</h3>
					<Form
						className="p-2"
						form={form}
						layout="vertical"
						onFinish={handleSubmit}>
						<Form.Item
							name="email"
							label="Email"
							rules={[{ required: true, message: "Please input your email!" }]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="mt-4 bg-blue-500 w-full">
								Log in
							</Button>
						</Form.Item>
					</Form>
					<p>
						<Link className="no-underline" to="/register">
							Forget Password ?
						</Link>
					</p>
					<p> Or login with</p>
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
						Don't have an account? <Link to="/register">Register</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import "../styles/login.css";
import Cookies from "js-cookie";
const Login = () => {
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const token = Cookies.get("token");
	// 	if (token) {
	// 		navigate("/");
	// 	}
	// }, [navigate]);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/auth/login",
				formData
			);
			const user = response.data.user;
			if (user.isAdmin) {
				Cookies.set("token", response.data.token, { expires: 7, secure: true });
				message.success("Logged in as admin");
				navigate("/dashboard");
			} else {
				localStorage.setItem("user", JSON.stringify(user));
				Cookies.set("userToken", response.data.token, {
					expires: 7,
					secure: true,
				});
				message.success("Login Successful");
				navigate("/home");
			}
		} catch (error) {
			message.error("Invalid email or password. Please try again.");
		}
	};

	return (
		<section className="vh-100 flex items-center p-8  ">
			<div
				className="card w-2/4"
				style={{
					borderRadius: "15px",
					backgroundColor: "rgba(255, 255, 255, 0.5)",
				}}>
				<div className="card-body px-5">
					<div className=" w-full flex justify-center pb-8">
                        {/* <img src={Logo} alt="Logo" width={120} /> */}
                        Artvance
					</div>
					<form method="POST" onSubmit={handleSubmit}>
						<div className="form-outline mb-4">
							<input
								type="text"
								name="email"
								placeholder="email"
								className="form-control"
								onChange={handleChange}
							/>
						</div>
						<div className="form-outline mb-4">
							<input
								type="password"
								name="password"
								placeholder="password"
								className="form-control"
								onChange={handleChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary mt-4 w-full">
							Log in
						</button>
					</form>
					<div className="text-center mt-2">
						<p>
							Don't have an account? <Link to="/register">Register</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;

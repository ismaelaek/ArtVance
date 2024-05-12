import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./auth/login";
import Register from "./auth/register";
import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<h1>Page Not Found</h1>} />
			</Routes>
		</>
	);
}

export default App;

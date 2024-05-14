import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./auth/login";
import Register from "./auth/register";
import store from "./storage/store";
import "./App.css";

function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<h1>Page Not Found</h1>} />
			</Routes>
		</Provider>
	);
}

export default App;

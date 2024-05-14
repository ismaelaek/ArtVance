import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./storage/store";
import Container from "./components/container";
import Login from "./auth/login";
import Register from "./auth/register";
import "./App.css";

function App() {
	const location = useLocation();

	const isLoginOrRegister =
		location.pathname === "/login" || location.pathname === "/register";

	return (
		<Provider store={store}>
			{/* /* ila path kaykhalf login, container kay renderi routes ldakhl dyalo, bach ib9a dima navbar w sider fix */}
			{!isLoginOrRegister ? (
				<Container>
					<Routes>
						{/*ga3 routes ldakhel d application khas ikono hna */}
						<Route path="/" element={<h1>Home</h1>} />
						<Route path="*" element={<h1>Page Not Found</h1>} />
					</Routes>
				</Container>
			) : (
					<Routes>
						{/** hna aykono routes dyal login with google, facebook */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			)}
		</Provider>
	);
}

export default App;

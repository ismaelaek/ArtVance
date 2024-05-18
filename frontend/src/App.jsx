import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./storage/store";
import Container from "./components/container";
import Login from "./auth/login";
import Register from "./auth/register";
import Card from "./components/profile/card";
import Feed from "./components/feed";
import Messages from "./components/messages/messagesMain";
import Marketplace from "./components/market/marketplace";
import ProductDetails from "./components/market/productDetails";
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
						<Route path="/" element={<Feed />} />
						<Route path="/profile/:id" element={<Card />} />
						<Route path="/messages" element={<Messages />} />
						<Route path="/marketplace" element={<Marketplace />} />
						<Route path="/marketplace/art/:id" element={<ProductDetails />} />
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


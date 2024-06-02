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
import EditProfile from "./components/editProfile";
import PrivacyPolicy from "./components/privacyPolicy";
import SavePosts from "./components/savedPosts";
import Search from "./components/search";
import AddProdcut from "./components/market/addProdcut";
import PostDetails from "./components/postDetails";
import NotFound from "./components/notFound";
import EmptyMessages from "./components/messages/emptyMessage";
import Dashboard from "./admin/dashboard";
import Statistics from "./admin/Statistics/statistics";

function App() {
	const location = useLocation();

	const isLoginOrRegister =
		location.pathname === "/login" ||
		location.pathname === "/register" ||
		location.pathname === "/dashboard"||
		location.pathname === "/statistics";

	return (
		<Provider store={store}>
			{/* /* ila path kaykhalf login, container kay renderi routes ldakhl dyalo, bach ib9a dima navbar w sider fix */}
			{!isLoginOrRegister ? (
				<Container>
					<Routes>
						{/*ga3 routes ldakhel d application khas ikono hna */}
						<Route path="/" element={<Feed />} />
						<Route path="/profile/:id" element={<Card />} />
						<Route path="/profile/:id/edit" element={<EditProfile />} />
						<Route path="/settings/privacy" element={<PrivacyPolicy />} />
						<Route path="/messages" element={<EmptyMessages />} />
						<Route path="/messages/conversation/:id" element={<Messages />} />
						<Route path="/marketplace" element={<Marketplace />} />
						<Route path="/marketplace/addlisting" element={<AddProdcut />} />
						<Route path="/marketplace/art/:id" element={<ProductDetails />} />
						<Route path="/saved" element={<SavePosts />} />
						<Route path="/post/:id" element={<PostDetails />} />
						<Route path="/search" element={<Search />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			) : (
				<Routes>
					{/** hna aykono routes dyal login with google, facebook */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/statistics" element={<Statistics />} />
				</Routes>
			)}
		</Provider>
	);
}

export default App;


import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Layout, Dropdown, Menu, theme } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaUser, FaBookmark } from "react-icons/fa";
import { FaShop, FaMessage } from "react-icons/fa6";
import { RiSettings5Fill } from "react-icons/ri";
import { Avatar } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNotifications } from "@/storage/notiSlice";


const { Header, Content, Sider } = Layout;

const Container = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loggedUser, setLoggedUser] = useState({});
	const { userNotifications } = useSelector((state) => state.notifications);

	const handleLogout = () => {
		const token = Cookies.get("userToken");

		// axios
		// 	.post(
		// 		"http://127.0.0.1:8000/api/auth/logout",
		// 		{},
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 		}
		// 	)
		// 	.then((response) => {
		// 		Cookies.remove("userToken");
		// 		Cookies.remove("loggedUser");
		// 		localStorage.removeItem("loggedUser");
		// 		message.success(response.data.message);
		// 		navigate("/login");
		// 	})
		// 	.catch((error) => {
		// 		message.error("Error logging out");
		// 	});
		Cookies.remove("userToken");
		Cookies.remove("loggedUser");
		localStorage.removeItem("loggedUser");
		// message.success(response.data.message);
		navigate("/login");
	};

	useEffect(() => {
		const userToken = Cookies.get("userToken");
		if (!userToken) {
			navigate("/login");
		} else {
			const logged = JSON.parse(localStorage.getItem("loggedUser"));
			setLoggedUser(logged);
		}
	}, [navigate]);
	
	useEffect(() => {
		dispatch(fetchUserNotifications(loggedUser.id))
	},[dispatch, loggedUser.id])
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const handleSearchChange = (event) => {
		const value = event.target.value;
		if (value.trim() !== "") {
			navigate(`/search/?q=${encodeURIComponent(value)}`);
		}
	};

	const notificationMenu = (
		<Menu className="max-h-96 overflow-auto w-96 m-0 p-0">
			{userNotifications?.map((notification) => (
				<Menu.Item key={notification.id}>
					<div
						className={` ${
							!notification.is_read && " font-semibold"
						} p-2 rounded-xl flex items-center gap-3`}>
						<Avatar
							src={notification.user.photo}
							className="ratio-1x1"
							size={30}
						/>
						<p>
							{notification.user.nickname} {notification.content}
						</p>
					</div>
				</Menu.Item>
			))}
		</Menu>
	);


	return (
		<Layout>
			<Header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "#fff",
					zIndex: 1,
					width: "100%",
					height: "50px",
					borderBottom: "#f5f5f5 solid 1px",
				}}>
				<Link className="no-underline" to="/">
					<h3 className="pt-2 text-indigo-400 app-name">ArtVance</h3>
				</Link>
				<Input
					className="w-1/3"
					placeholder="Search something..."
					onChange={handleSearchChange}
					suffix={
						<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />
					}></Input>
				<div className="flex p-2 gap-3 items-center h-full">
					<Dropdown
						overlay={notificationMenu}
						trigger={["click"]}
						placement="bottom">
						<button>
							<IoNotificationsOutline size={20} className="mr-3" />
						</button>
					</Dropdown>

					<Link
						to={`/profile/${loggedUser.id}`}
						className="no-underline text-black hover:underline">
						<p className="pt-3 text-lg text-center line-height-full">
							{loggedUser?.username}
						</p>
					</Link>
					<Link to={`/profile/${loggedUser.id}`}>
						<Avatar src={loggedUser.photo} alt="profile picture" />
					</Link>
				</div>
			</Header>
			<Layout>
				<Sider
					className="container-sider"
					width={250}
					style={{
						background: colorBgContainer,
					}}>
					<nav className="flex font-semibold flex-col justify-center w-full px-4 pt-4 sider-nav">
						<NavLink to="/">
							<FaHome /> Feed
						</NavLink>
						<NavLink to={`/profile/${loggedUser.id}`}>
							<FaUser /> Profile
						</NavLink>
						<NavLink to="/marketplace">
							<FaShop /> Marketplace
						</NavLink>
						<NavLink to="/messages">
							<FaMessage /> Messages
						</NavLink>
						<NavLink to="/settings/privacy">
							<RiSettings5Fill /> Settings
						</NavLink>
						<NavLink to="/saved">
							<FaBookmark /> Saved
						</NavLink>
					</nav>
					<button
						className="absolute bottom-3 left-8 text-xl flex gap-3 items-center"
						onClick={handleLogout}>
						<BiLogOut />
						<span>log out</span>
					</button>
				</Sider>
				<Layout>
					<Content
						className="content"
						style={{
							borderRadius: borderRadiusLG,
							overflowX: "scroll",
						}}>
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default Container;

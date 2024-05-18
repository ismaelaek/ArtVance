import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Layout, theme } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaUser, FaBookmark } from "react-icons/fa";
import { FaShop, FaMessage } from "react-icons/fa6";
import { RiSettings5Fill } from "react-icons/ri";
import { Avatar } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { encryptId } from "@/lib/utils";

const { Header, Content, Sider } = Layout;

const Container = ({ children }) => {
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState({});
	const [encryptedId, setEncryptedId] = useState("");
	const handleLogout = () => {
		Cookies.remove("userToken");
		Cookies.remove("loggedUser");
		navigate("/login");
	};
	useEffect(() => {
		const userToken = Cookies.get("userToken");
		if (!userToken) {
			navigate("/login");
		} else {

			//! kayjib user li dar login mn local storage 
			const logged = JSON.parse(localStorage.getItem("loggedUser"));
			setLoggedUser(logged);

			//! hna kanhachiw id bach maybanch f url
			setEncryptedId(encryptId(logged.id));
		}
	}, [navigate]);
	
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

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
				<Link className="no-underline" to='/'>
					<h3 className="pt-2 text-main app-name">ArtVance </h3>
				</Link>
				<Input
					className="w-1/3"
					placeholder="Search something..."
					suffix={
						<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />
					}></Input>
				<div className="flex p-2 gap-3  items-center h-full">
					<Link
						to={`/profile/${encryptedId}`}
						className=" no-underline text-black hover:underline">
						<p className="pt-3 text-lg text-center line-height-full">
							{loggedUser?.username}
						</p>
					</Link>
					<Link to={`/profile/${encryptedId}`}>
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
					<nav className="flex flex-col justify-center w-full px-4 pt-4 sider-nav">
						<NavLink to="/">
							<FaHome /> Feed
						</NavLink>
						<NavLink to={`/profile/${encryptedId}`}>
							<FaUser /> Profile
						</NavLink>
						<NavLink to="/marketplace">
							<FaShop /> Marketplace
						</NavLink>
						<NavLink to="/messages">
							<FaMessage /> Messages
						</NavLink>
						<NavLink to="/settings">
							<RiSettings5Fill /> Settings
						</NavLink>
						<NavLink to="/saved">
							<FaBookmark /> Saved
						</NavLink>
					</nav>
					<button onClick={handleLogout}>log out</button>
				</Sider>
				<Layout>
					<Content
						className="content"
						style={{
							borderRadius: borderRadiusLG,
							overflowX: "scroll",
						}}>
						{/* had childer hya Routes li kaykoun ldakhl dyalha ga3 routes, y3ni content atbdelt m3a route machi m3a state */}
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default Container;

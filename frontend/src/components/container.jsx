import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Layout, theme } from "antd";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaBookmark } from "react-icons/fa";
import { FaShop, FaMessage } from "react-icons/fa6";
import { RiSettings5Fill } from "react-icons/ri";
import ProfilePic from "../assets/profile.jpg";


const { Header, Content, Sider } = Layout;

const Container = ({ children }) => {
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
				<h3 className="pt-2 text-main app-name">ArtVance </h3>
				<Input
					className="w-1/3"
					placeholder="Search something..."
					suffix={
						<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />
					}></Input>
				<div className="flex p-2 gap-3  items-center h-full">
					<p className="pt-3 text-lg text-center line-height-full">
						Ahmed Mouhssine hh
					</p>
					<div className="h-full rounded-full overflow-hidden border-gray-100 border-solid border-2">
						<img src={ProfilePic} alt="" className="nav-profile-pc" />
					</div>
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
						<NavLink to="/" >
							<FaHome /> Feed
						</NavLink>
						<NavLink to="/profile">
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
				</Sider>
				<Layout style={{ padding: "24px 24px" }}>
					<Content
						className="content"
						style={{
							margin: 0,
							background: colorBgContainer,
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

import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Layout, Avatar, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Statistics from "./Statistics/statistics";
import { setSelectedTab } from "../storage/dashboardSlice";
import UsersReports from "./UsersReports";
import PostsReports from "./PostsReports";
const { Header, Sider, Content } = Layout;
import { BiLogOut } from "react-icons/bi";


function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
  getItem("Statistics", "1", <IoStatsChart />),
  getItem("Reports users", "2", <FaUser />),
  getItem("Reports posts", "3", <BsFillPostcardHeartFill />),
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();
  const selectedTab = useSelector((state) => state.dashboard.selectedTab);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, [navigate]);
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem('admin');
    navigate("/login");
  }
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
					<h3 className="pt-2 text-indigo-400 app-name">Dashboard</h3>
				</Link>
				<div className="flex p-2 gap-3 items-center h-full">
					<span>{admin ? admin.nickname : "Admin"}</span>
					{admin && <Avatar src={admin.photo} size={30} />}
				</div>
			</Header>
			<Layout>
				<Sider
					className="container-sider"
					width={250}
					style={{
						background: "#fff",
					}}>
					<Menu
						defaultSelectedKeys={["1"]}
						mode="inline"
						items={items}
						onSelect={({ key }) => dispatch(setSelectedTab(key))}
					/>
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
							borderRadius: "8px",
							overflowX: "scroll",
						}}>
						<main className={`container h-full rounded-xl`}>
							<ContentContainer selectedTab={selectedTab} />
						</main>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default Dashboard;

const ContentContainer = ({ selectedTab }) => {
  switch (selectedTab) {
    case "1":
      return <Statistics />;
    case "2":
      return <UsersReports />;
    case "3":
      return <PostsReports />;
    default:
      return null;
  }
};

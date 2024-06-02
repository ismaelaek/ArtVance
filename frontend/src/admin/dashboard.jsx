import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Layout, Avatar } from "antd";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { BsFillPostcardHeartFill } from "react-icons/bs";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const navigate = useNavigate();
 
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
                    <h3 className="pt-2 text-indigo-400 app-name">Dshbord</h3>
                </Link>
                <Input
                    className="w-1/3"
                    placeholder="Search something..."
                    suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                />
                <div className="flex p-2 gap-3 items-center h-full">
                    {admin && <Avatar src={admin.avatar} />}
                    <span>{admin ? admin.nickname : "Admin"}</span>
                </div>
            </Header>
            <Layout>
                <Sider
                    className="container-sider"
                    width={250}
                    style={{
                        background: '#fff',
                    }}>
                    <nav className="flex font-semibold flex-col w-full px-4 pt-4 sider-nav">
                        <NavLink to="/statistics">
                            <IoStatsChart /> Statistics
                        </NavLink>
                        <NavLink to="/">
                            <FaUser /> top reports users
                        </NavLink>
                        <NavLink to="/">
                            <BsFillPostcardHeartFill /> top reports posts
                        </NavLink>
   
                    </nav>

                    {/* <button
                        className="absolute bottom-3 left-8 text-xl flex gap-3 items-center"
                        onClick={() => {
                            localStorage.removeItem('admin');
                            window.location.href = '/login'; // Redirect to login page
                        }}>
                        <BiLogOut /> Log out
                    </button> */}
                </Sider>
                <Layout>
                    <Content
                        className="content"
                        style={{
                            borderRadius: '8px',
                            overflowX: "scroll",
                        }}>
                        {/* Add your dashboard content here */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import ProfilePic from "../../assets/profile.jpg";
import BackgroundPic from "../../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu, Upload, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "@/storage/profileSlice";
import TimeLine from "./timeLine/timeLine";
import Friends from "./friends";
import About from "./about";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decryptId } from "@/lib/utils";

function Card() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const decryptedId = decryptId(id);
	const [current, setCurrent] = useState("1");
	const selectedTab = useSelector((state) => state.profile.profileTab);
	const [user, setUser] = useState({});

	const handleClick = (e) => {
		setCurrent(e.key);
		dispatch(setSelectedTab(e.key));
	};

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/users/${decryptedId}`
				);
				setUser(response.data);
			} catch (error) {
				throw error;
			}
		};
		getUser();
	}, [decryptedId]);

	const handleClickDrop = (e) => {
		console.log(e.key);
		switch (e.key) {
			case "editInfo":
				navigate("/profile/1/edit");
				break;
			case "editpassword":
				navigate("/profile/setting/changepassword");
				break;
			default:
				break;
		}
	};

	const menu = (
		<Menu onClick={handleClickDrop}>
			<Menu.Item key="editInfo" icon={<LiaUserEditSolid />}>
				Edit info
			</Menu.Item>
			<Menu.Item key="editpassword" icon={<RiLockPasswordLine />}>
				Change password
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="w-full mb-5">
			<div
				style={{
					fontFamily: "'Poppins', sans-serif",
					width: "100%",
					position: "relative",
					backgroundColor: "white",
					overflow: "hidden",
				}}>
				<div>
					<img
						style={{
							width: "100%",
							height: "200px",
							objectFit: "cover",
						}}
						src={user.cover ? user.cover : BackgroundPic}
						alt=""
					/>
					<Upload accept="image/*" showUploadList={false}>
						<button
							style={{
								position: "absolute",
								top: "45%",
								right: "20px",
								zIndex: 1,
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								border: "none",
								borderRadius: "5px",
								padding: "5px 10px",
								cursor: "pointer",
								color: "#fff",
								transition: "transform 0.2s",
							}}
							onMouseEnter={(e) => {
								e.target.style.transform = "scale(1.1)";
							}}
							onMouseLeave={(e) => {
								e.target.style.transform = "scale(1)";
							}}>
							<FontAwesomeIcon icon={faCamera} /> Edit cover
						</button>
					</Upload>
				</div>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "20px",
						transform: "translateY(-50%)",
						display: "flex",
						alignItems: "center",
						color: "#fff",
					}}>
					<div
						style={{
							position: "relative",
							borderRadius: "50%",
							border: "3px solid #fff",
							boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
							width: "100px",
							height: "100px",
							overflow: "hidden",
							marginRight: "10px",
							transition: "background-color 0.9s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.querySelector(".camera-icon").style.visibility =
								"visible";
							e.currentTarget.style.background = "rgba(0, 0, 0, 0.5)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.querySelector(".camera-icon").style.visibility =
								"hidden";
							e.currentTarget.style.background = "none";
						}}>
						<img
							style={{
								width: "100%",
								height: "100%",
								borderRadius: "50%",
								objectFit: "cover",
							}}
							src={user.photo ? user.photo : ProfilePic}
							alt=""
						/>
						<Upload accept="image/*" showUploadList={false}>
							<div
								className="camera-icon"
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									background: "rgba(0, 0, 0, 0.5)",
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									visibility: "hidden",
									fontSize: "28px",
									cursor: "pointer",
									color: "white",
								}}>
								<FontAwesomeIcon icon={faCamera} />
							</div>
						</Upload>
					</div>
					<h1>{user.nickname}</h1>
				</div>
				<div
					style={{
						paddingTop: "50px",
						color: "#000",
						paddingLeft: "20px",
					}}>
					<p className="text-wrap text-justify">{user.bio}</p>
					<p>
						From <b>{user.address}</b> <br />
						Born on <b>{user.birthday}</b>
						<br />
					</p>
				</div>
			</div>
			<div className=" flex justify-between pr-5 bg-white">
				<Menu
					onClick={handleClick}
					selectedKeys={[current]}
					mode="horizontal"
					className="w-2/3">
					<Menu.Item key="1">Time line</Menu.Item>
					<Menu.Item key="2">About</Menu.Item>
					<Menu.Item key="3" icon={<AppstoreOutlined />}>
						Friend (5)
					</Menu.Item>
				</Menu>
				<Dropdown overlay={menu}>
					<HiDotsVertical className="text-xl" />
				</Dropdown>
			</div>
			<div className="data">
				<ContentContainer selectedTab={selectedTab} user={user} />
			</div>
		</div>
	);
}

export default Card;

const ContentContainer = ({ selectedTab, user }) => {
	switch (selectedTab) {
		case "1":
			return <TimeLine />;
		case "2":
			return <About user={user} />;
		case "3":
			return <Friends />;
		default:
			return null;
	}
};

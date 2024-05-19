import React, { useEffect, useState } from "react";
import ProfilePic from "../../assets/profile.jpg";
import BackgroundPic from "../../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "@/storage/profileSlice";
import TimeLine from "./timeLine/timeLine";
import Friends from "./friends";
import About from "./about";
import { Upload } from "antd";
import { useParams } from "react-router-dom";
import { decryptId } from "@/lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFollowStats } from "@/storage/usersSlice";

function Card() {
    const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const decryptedId = decryptId(id);
	const [current, setCurrent] = useState("1");
	const selectedTab = useSelector((state) => state.profile.profileTab);
	const { followStats } = useSelector(state => state.users);
	const [user, setUser] = useState({});

	const handleClick = (e) => {
		setCurrent(e.key);
		dispatch(setSelectedTab(e.key));
	};

	useEffect(() => {
		dispatch(getFollowStats(decryptedId));
		//! fixed dak prop dyal tabs 
		dispatch(setSelectedTab('1'));
	}, [dispatch])
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/users/${decryptedId}`
				);
				setUser(response.data);

				// TODO add logic to return the 404 on invalid user (random url)
			} catch (error) {
				throw error;
			}
		};
		getUser();
	}, [decryptedId]);


	const menu = (
		<Menu>
			<Menu.Item key="editInfo" icon={<FontAwesomeIcon icon={faCamera} />}>
				Edit info
			</Menu.Item>
		</Menu>
	);

	return (
		<div className=" w-full mb-5">
			<div
				style={{
					fontFamily: "'Poppins', sans-serif",
					width: "100%",
					position: "relative",
					backgroundColor: "white",
					overflow: "hidden",
				}}>
				{/* Background pic */}
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
					{/* Edit cover button */}
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

				{/* Profile pic and name */}
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
						{/* Profile picture */}
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
						{/* Camera icon for editing picture */}
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

				{/* Bio */}
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
			{/* navbar */}
			<div>
				<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
					<Menu.Item key="1">Time line</Menu.Item>
					<Menu.Item key="2">About</Menu.Item>
					<Menu.Item key="3" icon={<AppstoreOutlined />}>
						Friend ({followStats.following?.length})
					</Menu.Item>
				</Menu>
			</div>
			<div className="data">
				<ContentContainer
					selectedTab={selectedTab}
					user={user}
					stats={followStats}
				/>
			</div>
		</div>
	);
}

export default Card;

const ContentContainer = ({ selectedTab, user, stats }) => {
	switch (selectedTab) {
		case "1":
			return <TimeLine logged={user} />;
		case "2":
			return <About user={user} />;
		case "3":
			return <Friends stats={stats} logged={user} />;
		default:
			return null;
	}
};

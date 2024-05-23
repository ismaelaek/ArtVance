import React, { useEffect, useState } from "react";
import ProfilePic from "../../assets/profile.jpg";
import BackgroundPic from "../../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AppstoreOutlined,FileProtectOutlined } from "@ant-design/icons";
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
import { getFollowStats } from "@/storage/usersSlice";
import { FaBirthdayCake } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ImgCrop from "antd-img-crop";


function Card() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const [current, setCurrent] = useState("1");
	const selectedTab = useSelector((state) => state.profile.profileTab);
	const { followStats } = useSelector(state => state.users);
	const [user, setUser] = useState({});
	const logged = JSON.parse(localStorage.getItem("loggedUser"))

	const handleClick = (e) => {
		setCurrent(e.key);
		dispatch(setSelectedTab(e.key));
	};

	useEffect(() => {
		dispatch(getFollowStats(id));
		//! fixed dak prop dyal tabs
		dispatch(setSelectedTab("1"));
	}, [dispatch, id, user.id]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/users/${id}`
				);
				setUser(response.data);
			} catch (error) {
				throw error;
			}
		};
		getUser();
	}, [id]);


	const handleClickDrop = (e) => {
		switch (e.key) {
			case "editInfo":
				navigate(`/profile/${id}/edit`);
				break;
			case "privacy":
				navigate("/settings/privacy");
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
			<Menu.Item key="privacy" icon={<FileProtectOutlined  />}>
				privacy policy
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="w-full mb-5">
			<div
				className=" w-full relative bg-white overflow-hidden"
				style={{
					fontFamily: "'Poppins', sans-serif",
				}}>
				<div>
					<img
						className=" w-full h-48 object-cover"
						src={user.cover ? user.cover : BackgroundPic}
						alt=""
					/>
					{logged.id === user.id && (
						<Upload accept="image/*" showUploadList={false}>
							<button
								className="edit-cover"
								onMouseEnter={(e) => {
									e.target.style.transform = "scale(1.1)";
								}}
								onMouseLeave={(e) => {
									e.target.style.transform = "scale(1)";
								}}>
								<FontAwesomeIcon icon={faCamera} /> Edit cover
							</button>
						</Upload>
					)}
				</div>
				<div
					style={{
						position: "absolute",
						top: "47%",
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
							className=" w-full h-full rounded-full object-cover"
							src={user.photo ? user.photo : ProfilePic}
							alt=""
						/>
						{logged.id === user.id && (
							<ImgCrop>
								<Upload accept="image/*" showUploadList={false}>
									<div className="camera-icon">
										<FontAwesomeIcon icon={faCamera} />
									</div>
								</Upload>
							</ImgCrop>
						)}
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
						{user.address && (
							<span className="flex gap-2 items-center">
								<FaLocationDot /> <b>{user.address}</b> <br />
							</span>
						)}
						{user.birthday && (
							<span className="flex gap-2 items-center">
								<FaBirthdayCake /> <b>{user.birthday}</b>
							</span>
						)}
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
					<Menu.Item key="3">
						Followers ({followStats.followers?.length})
					</Menu.Item>
					<Menu.Item key="4">
						Following ({followStats.following?.length})
					</Menu.Item>
				</Menu>
				{logged.id == user.id && (
					<Dropdown overlay={menu}>
						<HiDotsVertical className="text-xl" />
					</Dropdown>
				)}
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
			return <TimeLine user={user} />;
		case "2":
			return <About user={user} />;
		case "3":
			return <Friends stats={stats} hint={'following'} />;
		case "4":
			return <Friends stats={stats} hint={"followers"} />;
		default:
			return null;
	}
};

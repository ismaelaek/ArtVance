import React, { useEffect, useState } from "react";
import ProfilePic from "../../assets/profile.jpg";
import BackgroundPic from "../../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AppstoreOutlined, FileProtectOutlined } from "@ant-design/icons";
import { Menu, Upload, Dropdown, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "@/storage/profileSlice";
import TimeLine from "./timeLine/timeLine";
import Friends from "./friends";
import About from "./about";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFollowStats } from "@/storage/usersSlice";
import { followUser, unfollowUser } from "@/storage/followSlice";
import { FaBirthdayCake } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ImgCrop from "antd-img-crop";

function Card() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const [current, setCurrent] = useState("1");
	const selectedTab = useSelector((state) => state.profile.profileTab);
	const { followStats } = useSelector((state) => state.users);
	const [user, setUser] = useState({});
	const logged = JSON.parse(localStorage.getItem("loggedUser"));
	const [loading, setLoading] = useState(false);

	const [isFollowing, setIsFollowing] = useState(false);

	const handleClick = (e) => {
		setCurrent(e.key);
		dispatch(setSelectedTab(e.key));
	};

	useEffect(() => {
		dispatch(getFollowStats(id));
		dispatch(setSelectedTab("1"));
	}, [dispatch, id, user.id, isFollowing]);

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
		setIsFollowing(false);
		if (followStats) {
			followStats?.followers?.map((follower) => {
				if (follower.id === logged.id) {
					setIsFollowing(true);
					return;
				}
			});
		}
	}, [id, logged.id, loading]);

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
			<Menu.Item key="privacy" icon={<FileProtectOutlined />}>
				Privacy policy
			</Menu.Item>
		</Menu>
	);

	const handleFollow = () => {
		try {
			dispatch(followUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowing(true);
		} catch (error) {
			message.error(error.message);
		}
	};

	const handleUnfollow = () => {
		try {
			dispatch(unfollowUser({ followerId: logged.id, followedId: user.id }));
			setIsFollowing(false);
		} catch (error) {
			message.error(error.message);
		}
	};

	

	const handleUploadChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			setLoading(false);
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			setLoading(false);
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must be smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	const handleUpdateProfilePic = async ({ file }) => {
		const formData = new FormData();
		formData.append("photo", file);

		try {
			setLoading(true);
			const respons = await axios.post(
				`http://127.0.0.1:8000/api/users/${logged.id}/update-profile-pic`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			message.success("Profile picture updated successfully");
			localStorage.setItem("loggedUser", JSON.stringify(respons.data.user));
			navigate(`/profile/${logged.id}`);
		} catch (error) {
			console.error("Error updating profile picture:", error);
			message.error("Failed to update profile picture");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full mb-5">
			<div
				className="w-full relative bg-white overflow-hidden"
				style={{ fontFamily: "'Poppins', sans-serif" }}>
				<div>
					<img
						className="w-full h-48 object-cover"
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
							className="w-full h-full rounded-full object-cover"
							src={user.photo ? user.photo : ProfilePic}
							alt=""
						/>
						{logged.id === user.id && (
							<ImgCrop aspect={1} showGrid>
								<Upload
									accept="image/*"
									showUploadList={false}
									beforeUpload={beforeUpload}
									onChange={handleUploadChange}
									customRequest={handleUpdateProfilePic}>
									<div className="camera-icon">
										<FontAwesomeIcon icon={faCamera} />
										{loading && <span>Uploading...</span>}
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
						{user.address ? (
							<span className="flex gap-2 items-center">
								<FaLocationDot /> <b>{user.address}</b> <br />
							</span>
						) : (
							logged.id == user.id && (
								<span className="flex gap-2 items-center">
									<FaLocationDot />{" "}
									<Link
										className=" no-underline text-gray-700"
										to={`/profile/${logged.id}/edit`}>
										Add address
									</Link>{" "}
									<br />
								</span>
							)
						)}
						{user.birthday ? (
							<span className="flex gap-2 items-center">
								<FaBirthdayCake /> <b>{user.birthday}</b> <br />
							</span>
						) : (
							logged.id == user.id && (
								<span className="flex gap-2 items-center">
									<FaBirthdayCake />{" "}
									<Link
										className=" no-underline text-gray-700"
										to={`/profile/${logged.id}/edit`}>
										Add birthday
									</Link>{" "}
									<br />
								</span>
							)
						)}
					</p>
				</div>
			</div>
			{logged.id != id && (
				<div className="bg-white">
					<div className="w-1/4 flex gap-3 ml-4">
						{isFollowing ? (
							<button
								className="btn btn-outline-primary"
								onClick={handleUnfollow}>
								Unfollow
							</button>
						) : (
							<button className="btn btn-primary" onClick={handleFollow}>
								Follow
							</button>
						)}
						<button className="btn btn-primary">Message</button>
					</div>
				</div>
			)}
			<div className="flex justify-between pr-5 bg-white">
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
				{logged.id === user.id && (
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
			return <Friends stats={stats} hint={"following"} />;
		case "4":
			return <Friends stats={stats} hint={"followers"} />;
		default:
			return null;
	}
};

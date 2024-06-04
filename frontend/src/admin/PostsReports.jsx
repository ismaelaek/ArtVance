import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Tag, Avatar } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const PostsReports = () => {
	const [dataSource, setDataSource] = useState([]);
	const [error, setError] = useState(null);

  const fetchTopReportedPosts = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/report/top-posts`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("userToken")}`,
					},
				}
			);

			const formattedData = response.data.map((item) => ({
				key: item.reported_post.id,
				caption: item.reported_post.caption,
				reports: item.total_reports,
				forSale: item.reported_post.isForSale,
				user: item.reported_post.user,
				media: item.reported_post.media,
			}));

			setDataSource(formattedData);
		} catch (error) {
			console.error("Error getting top reported posts:", error);
			setError(error);
		}
	};
	useEffect(() => {
		fetchTopReportedPosts();
	}, []);

	const handleDelete = async (key) => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/posts/${key}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("userToken")}`,
				},
			});
			message.success("Post deleted successfully");
      fetchTopReportedPosts();
      setDataSource(dataSource.filter((item) => item.key !== key));
		} catch (error) {
			message.error("Failed to delete post");
		}
	};

	const columns = [
		{
			title: "Photo",
			dataIndex: "photo",
			key: "photo",
			render: (_, record) =>
				record.media.length !== 0 && (
					<img
						src={record.media[0].url}
						alt="Post"
						style={{ width: 100, height: 100, objectFit: "cover" }}
					/>
				),
		},
		{
			title: "Caption",
			dataIndex: "caption",
			key: "caption",
		},
		{
			title: "Reports",
			dataIndex: "reports",
			key: "reports",
		},
		{
			title: "User",
			key: "user",
			render: (_, record) => (
				<div style={{ display: "flex", alignItems: "center" }}>
					<Avatar src={record.user.photo} />
					<span style={{ marginLeft: 8 }}>{record.user.nickname}</span>
				</div>
			),
		},
		// {
		// 	title: "forSale",
		// 	dataIndex: "forSale",
		// 	key: "forSale",
		// 	render: (forSale) => (
		// 		<Tag color={forSale ? "green" : "red"}>
		// 			{forSale ? "True" : "False"}
		// 		</Tag>
		// 	),
		// },
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Popconfirm
					title="Are you sure to delete this post?"
					onConfirm={() => {
						handleDelete(record.key);
					}}
					okText="Yes"
					cancelText="No">
					<Button type="primary" danger>
						Delete
					</Button>
				</Popconfirm>
			),
		},
	];

	if (error) {
		return <div>Error loading posts: {error.message}</div>;
	}

	return (
		<div>
			<h2>High Report Posts</h2>
			<Table dataSource={dataSource} columns={columns} />
		</div>
	);
};

export default PostsReports;

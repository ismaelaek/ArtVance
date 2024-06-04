import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Avatar } from "antd";

export default function TopPostingUsers() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://127.0.0.1:8000/api/users/top/active-users")
			.then((response) => {
				setUsers(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, []);

	const columns = [
		{
			title: "Photo",
			dataIndex: "photo",
			key: "avatar",
			render: (photo) => <Avatar src={photo} />,
		},
		{
			title: "Nickname",
			dataIndex: "nickname",
			key: "nickname",
		},
		{
			title: "Posts Count",
			dataIndex: "posts_count",
			key: "posts_count",
		},
	];

	return (
		<div>
			<h5 className="text-gray-400">Top Posting Users</h5>
            <Table
                className=" my-3"
				dataSource={users}
				columns={columns}
				loading={loading}
				rowKey="id"
				pagination={false} 
			/>
		</div>
	);
}

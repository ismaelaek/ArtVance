import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const JoinedUsers = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// Fetch data from API
		axios
			.get("http://127.0.0.1:8000/api/users")
			.then((response) => {
				const users = response.data;

				// Initialize array with all 12 months
				const usersByMonth = Array(12).fill(0);

				// Process data to count users per month
				users.forEach((user) => {
					const month = new Date(user.created_at).getMonth();
					usersByMonth[month] += 1;
				});

				// Convert to array format suitable for Recharts
				const chartData = usersByMonth.map((count, month) => ({
					month: new Date(2024, month).toLocaleString("default", {
						month: "short",
					}),
					users: count,
				}));

				setData(chartData);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<div>
			<h5 style={{ marginBottom: "20px", color: "#3339" }}>
				Users Joined Per Month
			</h5>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="users" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default JoinedUsers;

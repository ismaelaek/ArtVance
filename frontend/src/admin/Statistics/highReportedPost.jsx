import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const HighRepostedPosts = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// Fetch data from API
		axios
			.get("http://127.0.0.1:8000/api/posts")
			.then((response) => {
				const posts = response.data;

				// Initialize array with all 12 months
				const postsByMonth = Array(12).fill(0);

				// Process data to count posts per month
				posts.forEach((post) => {
					const month = new Date(post.created_at).getMonth();
					postsByMonth[month] += 1;
				});

				// Convert to array format suitable for Recharts
				const chartData = postsByMonth.map((count, month) => ({
					month: new Date(2024, month).toLocaleString("default", {
						month: "short",
					}),
					posts: count,
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
				Posts Per Month
			</h5>
			<ResponsiveContainer width="100%" height={400}>
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="posts"
						stroke="#8884d8"
						fill="#8884d8"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default HighRepostedPosts;

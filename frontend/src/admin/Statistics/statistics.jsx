import React from "react";
import { Grid, Paper } from "@mui/material";
import SummaryCards from "./summarCards.jsx";
import UserProductPostPercentage from "./pieChart.jsx"; 
import HighReportedUsers from "./highReportedUsers.jsx";
import HighRepostedPosts from "./highReportedPost.jsx";
import TopPostingUsers from "./topPostingUsers.jsx";


const Statistics = () => {
	// Retrieve logged admin information from local storage
	const admin = JSON.parse(localStorage.getItem("admin"));

	return (
		<main className="px-4 py-8">
			<div
				className="statistics-header"
				style={{
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					borderRadius: "10px",
					padding: "20px",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
					textAlign: "center",
					marginBottom: "20px",
					color: "white",
				}}>
				<h2>Statistics</h2>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<SummaryCards />
				</Grid>

				<Grid container item spacing={2}>
					<Grid item xs={12} sm={6}>
						<Paper elevation={3} className="p-4">
							<HighReportedUsers />
						</Paper>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Paper elevation={3} className="p-4">
							<HighRepostedPosts />
						</Paper>
					</Grid>
				</Grid>

				<Grid container item spacing={2}>
					<Grid item xs={12} sm={6}>
						<Paper elevation={3} className="p-4">
							<UserProductPostPercentage />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper elevation={3} className="p-4">
							<TopPostingUsers />
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</main>
	);
};

export default Statistics;

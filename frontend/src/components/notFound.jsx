import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom"; 

export default function NotFound() {
	return (
		<main className="bg-white p-3 h-full flex items-center justify-center rounded-xl">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Link to="/">
						<button className=" btn btn-primary">Back Home</button>
					</Link>
				}
			/>
		</main>
	);
}

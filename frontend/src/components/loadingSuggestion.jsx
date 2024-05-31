import React from "react";
import { Skeleton } from "antd";

const LoadingSuggestion = ({ avatarSize = 50, rows = 2 }) => {
	return (
		<div className="loading-skeleton w-full bg-white p-3 rounded-xl">
			<Skeleton active avatar={{ size: avatarSize }} paragraph={{ rows }} />
		</div>
	);
};

export default LoadingSuggestion;

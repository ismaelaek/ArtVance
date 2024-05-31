import React from "react";
import { Skeleton, Avatar, Button, Form, Input, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";


const { TextArea } = Input;
const { Item } = Form;

function LoadingPost() {
	return (
		<div className="p-3 rounded-xl mt-12 bg-white">
			<div className="flex justify-between">
				<div className="flex items-center">
					<Skeleton.Avatar active size="large" shape="circle" />
					<div className="ml-2 mt-3">
						<Skeleton.Input active size="small" style={{ width: 120 }} />
						<Skeleton.Input
							active
							size="small"
							style={{ width: 100, marginTop: 4 }}
						/>
					</div>
				</div>
				<Button
					icon={<MoreOutlined />}
					style={{ border: "none", fontSize: "20px" }}
				/>
			</div>
			<div className="mt-2 mb-5">
				<Skeleton.Input active size="default" style={{ width: "100%" }} />
				<div className="w-full flex justify-center items-center overflow-hidden mt-3">
					<Skeleton.Image
						active
						style={{ width: "800px", maxWidth: "500px", height: "300px" }}
					/>
				</div>
			</div>
			<hr className="border-gray-400 w-full mt-2" />
			<div className="flex items-center justify-between mt-2">
				<div className="flex gap-2 items-center">
					<Skeleton.Button active shape="circle" size="large" />
					<Skeleton.Input
						active
						size="small"
						style={{ width: 20, marginLeft: 10 }}
					/>
					<Skeleton.Button active shape="circle" size="large" />
					<Skeleton.Button active shape="circle" size="large" />
				</div>
				<Skeleton.Button active shape="circle" size="large" />
			</div>
			<hr style={{ borderColor: "gray", width: "100%", marginTop: "10px" }} />
			<Form>
				<div className="flex items-center mt-2 gap-3">
					<Skeleton.Avatar active size="large" shape="circle" />
					<Item name="commentContent" className="flex-1 mt-4">
						<Skeleton.Input
							active
							size="default"
							style={{ width: "100%", borderRadius: "20px" }}
						/>
					</Item>
					<Skeleton.Button active shape="circle" size="large" />
				</div>
			</Form>
		</div>
	);
}

export default LoadingPost;

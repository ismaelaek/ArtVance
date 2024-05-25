import React from "react";
import Product from "./product";
import { Link } from "react-router-dom";
import { Input } from "antd";

const Marketplace = () => {
	return (
		<main className="p-3 bg-white rounded-xl h-full ">
			<div className="flex gap-2 justify-between">
				<Input placeholder="search product"  className=" w-1/3"/>
				<Link to={"/marketplace/addlisting"} className="">
					<button className="btn btn-primary text-white w-full py-2">
						Add Listing
					</button>
				</Link>
			</div>
			<hr />
			<div className="flex flex-wrap gap-x-2 gap-y-2 overflow-auto p-3 items-start">
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
		</main>
	);
};

export default Marketplace;

import React, {useEffect} from "react";
import Product from "./product";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { getProducts } from "@/storage/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const Marketplace = () => {
	const dispatch = useDispatch();
	const { products, prodisLoading } = useSelector((state) => state.products);

	useEffect(() => {
        dispatch(getProducts());
	}, [dispatch]);
	
	return (
		<main className="p-3 bg-white rounded-xl h-full overflow-auto">
			<div className="flex gap-2 justify-between">
				<Input placeholder="search product" className=" w-1/3" />
				<Link to={"/marketplace/addlisting"} className="">
					<button className="btn btn-primary text-white w-full py-2">
						Add Listing
					</button>
				</Link>
			</div>
			<hr />
			<div className="flex flex-wrap gap-x-2 gap-y-2  p-3 items-start">
				{products?.length === 0 ? (
					<div> no producst yet</div>
				) : (
					products?.map((product) => (
						<Product key={product.id} product={product} />
					))
				)}
			</div>
		</main>
	);
};

export default Marketplace;

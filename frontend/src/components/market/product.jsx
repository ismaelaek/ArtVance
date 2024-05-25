import React from 'react'
import ProdImage from "../../assets/product.jpeg";
import { useNavigate } from 'react-router-dom';


const Product = ({ product }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/marketplace/art/${product.id}`);
	};
	return (
		<div
			className=" h-80 w-72 rounded-xl overflow-hidden cursor-pointer border-solid border-gray-200 border-2 shadow-md"
			onClick={handleClick}>
			<div className="h-44 overflow-hidden">
				<img
					src={product.image}
					alt={product.name}
					className=" w-full ratio-1x1 hover:scale-105 duration-200 ease-in-out"
				/>
			</div>
			<div className=" p-2 overflow-hidden">
				<p className="text-2xl m-0">{product.name} Mad</p>
				<p className=" text-xl font-bold m-0"> {product.price}</p>
				<p className="text-nowrap m-0">{product.description}</p>
				<p className="text-gray-500">Tinghir</p>
			</div>
		</div>
	);
};


export default Product;
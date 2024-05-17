import React from 'react'
import ProdImage from "../../assets/product.jpeg";
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/marketplace/art/2')
  }
  return (
		<div
			className=" h-72 w-72 rounded-xl overflow-hidden cursor-pointer "
			onClick={handleClick}>
			<div className="h-44 overflow-hidden">
				<img
					src={ProdImage}
					alt=""
					className=" w-full ratio-1x1 hover:scale-105 duration-200 ease-in-out"
				/>
			</div>
			<div className="p-2">
				<p className="text-2xl m-0">Childhood</p>
				<p className=" text-xl font-bold m-0"> 399</p>
				<p className="text-nowrap m-0">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
					minima vel perferendis alias autem
				</p>
				<p className="text-gray-500">Tinghir</p>
      </div>
		</div>
	);
}


export default Product;
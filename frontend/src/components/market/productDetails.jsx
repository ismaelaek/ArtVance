import React from "react";
import ProdImage from "../../assets/product.jpeg";
import ProfilePic from "../../assets/profile.jpg";
import { FaMessage, FaBookmark, FaShare } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Carousel } from "antd";
import { Link } from "react-router-dom";


export default function ProductDetails() {
    const handleSubmit = (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const message = formData.get("message");
			console.log("Form Values:", { message });
		};
	return (
		<main className="prod-details h-full">
			<div className="prod-imag h-full overflow-hidden flex justify-center bg-white p-3 rounded-xl">
				<Link
					to="/marketplace"
					className="absolute top-20 left-72 text-black text-2xl x-back">
					<FaTimes />
				</Link>
				<img src={ProdImage} alt="" className=" h-full" />
			</div>
			<div className=" bg-white h-full rounded-xl p-3">
				<p className="text-3xl m-0"> Childhood</p>
				<p className=" text-xl m-0 font-bold">399 MAD</p>
				<p className="text-gray-500">
					{" "}
					Listed 5 days ago in <b>Tinghir </b>
				</p>
				<div className="w-full flex flex-nowrap gap-3">
					<button className=" btn btn-outline-primary">
						<FaMessage className="inline-block mr-2" />
						<span className="inline-block"> Message</span>
					</button>
					<button className=" btn btn-outline-dark">
						<FaBookmark className="inline-block mr-2" />
						<span className="inline-block"> Save </span>
					</button>
					<button className=" btn btn-outline-dark">
						<FaShare className="inline-block mr-2" />
						<span className="inline-block"> Share </span>
					</button>
				</div>
				<hr />
				<p className="text-3xl m-0"> Details</p>
				<p className="m-0 max-h-44 overflow-hidden text-justify">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
					minima vel perferendis alias autem Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Necessitatibus facere ipsa impedit
					libero velit eos neque natus id dolorum earum.
				</p>
				<hr />
				<p className="text-3xl m-0"> Seller information</p>
				<div className="flex items-center gap-3 mt-2">
					<div className=" h-16 w-16 rounded-full overflow-hidden">
						<img src={ProfilePic} alt="" />
					</div>
					<Link
						to={"/profile"}
						className="no-underline text-black text-xl hover:underline">
						Ahmed Mouhssine
					</Link>
				</div>
				<hr />
				<div className="rounded-lg">
					<div className="mb-2 flex items-center">
						<FaMessage className="mr-2" />
						Send seller a message
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-2">
							<input
								type="text"
								name="message"
								defaultValue="Is this available?"
								className="w-full rounded-xl p-2 h-14 border-black border-solid border-1"
							/>
						</div>
						<button
							type="submit"
							className="w-full btn btn-primary rounded-md py-2">
							Send
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

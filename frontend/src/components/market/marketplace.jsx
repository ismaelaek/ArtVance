import React from 'react'
import Product from './product';

const Marketplace = () => {
  return (
		<main className="bg-white rounded-xl h-full flex flex-wrap gap-x-2 gap-y-2 overflow-auto p-3 items-start">
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
		</main>
	);
}

export default Marketplace;

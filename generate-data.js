const faker = require("faker");
const fs = require("fs");

//set locale to use VietNamese
faker.locale = "vi";

// radom categories
const randomCategoryList = (n) => {
	if (n <= 0) return [];

	const categoryList = [];

	// loop push category
	Array.from(new Array(n)).forEach(() => {
		const category = {
			id: faker.random.uuid(),
			name: faker.commerce.department(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		categoryList.push(category);
	});

	return categoryList;
};

// radom products
const randomProductList = (categoryList, numberOfProducts) => {
	if (numberOfProducts <= 0) return [];

	const productList = [];

	// random data
	for (const category of categoryList) {
		Array.from(new Array(numberOfProducts)).forEach(() => {
			const product = {
				categoryId: category.id,
				id: faker.random.uuid(),
				name: faker.commerce.productName(),
				color: faker.commerce.color(),
				price: Number.parseFloat(faker.commerce.price()),
				description: faker.commerce.productDescription(),
				thumbnail: faker.image.imageUrl(400, 400),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};

			productList.push(product);
		});
	}

	return productList;
};

// IIFE
(() => {
	// random data
	const categoryList = randomCategoryList(4);
	const productList = randomProductList(categoryList, 5);

	// prepare db object
	const db = {
		categories: categoryList,
		products: productList,
		profile: {
			name: "Po",
		},
	};

	// write db object to db.json file
	fs.writeFile("db.json", JSON.stringify(db), () => {
		console.log("generate data successfully");
	});
})();

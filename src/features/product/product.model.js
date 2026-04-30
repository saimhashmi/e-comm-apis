export default class ProductModel {
	constructor(id, name, desc, imageUrl, category, price, sizes) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.imageUrl = imageUrl;
		this.category = category;
		this.price = price;
		this.sizes = sizes;
	}

	static get() {
		return products;
	}
}

let products = [
	new ProductModel(
		// https://www.myntra.com/tshirts/the+souled+store/the-souled-store-women-oversized-solid-pink-t-shirts/29946580/buy
		1,
		"Women Oversized Solid Pink T-Shirts",
		"It's easy, breezy, & carefree! Made for the days when you want to conquer the world with freedom, these oversized beauties have got your back (literally, they've got a lot of extra fabric). So go ahead, strut your stuff like the fierce queen you are in our Women's Oversized Tees.Style Tip: Pair it with your favorite skinny jeans or leggings for a balanced silhouette. Add some statement jewelry and oversized sunglasses to complete the look.",
		"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29946580/2024/6/12/8ef5d8fa-f112-4681-9135-51272c6028111718174819224TheSouledStoreWomenV-NeckPocketsT-shirt1.jpg",
		"Clothes",
		499.0,
		["S", "M", "L"],
	),
	new ProductModel(
		2,
		"Ikigai",
		"The Japanese secret to a long and happy life.",
		"https://m.media-amazon.com/images/I/81l3rZK4lnL._SY425_.jpg",
		"Books",
		399.0,
	),
	new ProductModel(
		3,
		"Deep Work",
		"RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD.",
		"https://m.media-amazon.com/images/I/61zt25yYrCL._SY466_.jpg",
		"Books",
		399.0,
	),
];

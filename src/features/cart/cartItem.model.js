export default class CartItemModel {
	constructor(userID, productID, quantity) {
		this.id = ++id;
		this.userID = userID;
		this.productID = productID;
		this.quantity = quantity;
	}

	static get(userID) {
		const items = cartItems.filter((item) => item.userID === userID);
		return items;
	}

	static add(userID, productID, quantity) {
		const existingCartIndex = cartItems.findIndex(
			(item) =>
				item.userID === userID &&
				item.productID === parseInt(productID),
		);

		if (existingCartIndex >= 0) {
			cartItems[existingCartIndex].quantity += parseInt(quantity);
		} else {
			cartItems.push(
				new CartItemModel(
					userID,
					parseInt(productID),
					parseInt(quantity),
				),
			);
		}

		return cartItems.filter((item) => item.userID === userID);
	}

	static delete(cartItemID, userID) {
		const cartItemIndex = cartItems.findIndex(
			(item) =>
				item.id === parseInt(cartItemID) &&
				item.userID === parseInt(userID),
		);

		if (cartItemIndex >= 0) {
			cartItems.splice(cartItemIndex, 1);
			return true;
		} else {
			return false;
		}
	}
}

let id = 0;
let cartItems = [];

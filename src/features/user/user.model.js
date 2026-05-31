export default class UserModel {
	constructor(name, email, password, type) {
		// this.id = ++id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	// static get() {
	// 	return users;
	// }

	// static async signUp(userObj) {
	// 	try {
	// 		// 1. Get the database
	// 		const db = await getDB("EcommDB");
	// 		// 2. Get the collection
	// 		const collection = await db.collection("Users");
	// 		const newUser = new UserModel(
	// 			userObj.name,
	// 			userObj.email,
	// 			userObj.password,
	// 			userObj.type,
	// 		);

	// 		// users.push(newUser);
	// 		// 3. Insert New User in DB
	// 		const response = await collection.insertOne(newUser);

	// 		return response;
	// 	} catch (error) {
	// 		throw new customError("Something went wrong", 500);
	// 	}
	// }

	// static signIn(userObj) {
	// 	return users.find((user) => user.email == userObj.email);
	// }
}

// let id = 0;
// let users = [
// 	new UserModel("Seller", "seller@gmail.com", "1234", "seller"),
// 	new UserModel("Saim", "saaim1998@gmail.com", "12345", "Customer"),
// 	new UserModel("Saim2", "mdsaaim25@gmail.com", "12345", "Customer"),
// ];

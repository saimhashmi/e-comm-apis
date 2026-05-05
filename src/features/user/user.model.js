export default class UserModel {
	constructor(name, email, password, type) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	static get() {
		return users;
	}

	static signUp(userObj) {
		const newUser = new UserModel(
			userObj.name,
			userObj.email,
			userObj.password,
			userObj.type,
		);
		users.push(newUser);
		return true;
	}

	static signIn(userObj) {
		return users.find((user) => user.email == userObj.email);
	}
}

let users = [new UserModel("Seller", "seller@gmail.com", "1234", "seller")];

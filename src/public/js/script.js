function login() {
	const email = "saaim1998@gmail.com";
	const password = "12345";

	return fetch("http://localhost:3000/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then((res) => {
			if (!res.ok) {
				return res.json().then((err) => {
					throw err;
				});
			}

			return res.json();
		})
		.then((data) => {
			return data.JWT;
		})
		.catch((err) => {
			console.error("API Error", err);
		});
}

function getProducts(token) {
	fetch("http://localhost:3000/api/products", {
		headers: {
			authorization: token,
		},
	})
		.then((res) => res.json())
		.then((products) => {
			console.log(products.data);
			const tableBody = document.querySelector("#productTableBody");

			products.data.forEach((element) => {
				console.log(element);
				const row = document.createElement("tr");
				const rowData = `
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.desc}</td>
                    <td>${element.price}</td>
                    <td><img src="${element.imageUrl}" alt="${element.desc}"></td>
                `;

				row.innerHTML = rowData;
				tableBody.appendChild(row);
			});
		});
}

(async () => {
	try {
		const token = await login();
		// console.log(token);
		getProducts(token);
	} catch (err) {
		console.error("API Error", err);
	}
})();

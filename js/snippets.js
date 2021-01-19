var posts, users;

fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		// Get a JSON object from the response
		// This is a weird quirk of Fetch
		return response.json();
	}).then(function (data) {

		// Log the data to the console
 		console.log(data);

 		// Cache the data to a variable
 		posts = data;

 		// Make another API call and pass it into the stream
 		return fetch('https://jsonplaceholder.typicode.com/users');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Log the data to the console
		console.log(data);

		// Cache the data to a variable
		users = data;

		// Now that you have both APIs back, you can do something with the data

	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	});
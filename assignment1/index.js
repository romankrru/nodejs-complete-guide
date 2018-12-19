const http = require('http');

const createPage = content => {
	return `
		<html>
			<head>
				<title>My page</title>
			</head>
			<body>
				${content}
			</body>
		</html>
	`
}
const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;
	res.setHeader('Content-Type', 'text/html');

	if (url === '/') {
		res.write(createPage(`
			<h1>This is main page</h1>
			<form method="POST" action="/create-user">
				<input type="text" name="username">
				<button>Add</button>
			</form>
		`));

		return res.end();
	}

	if (url === '/users') {
		res.write('<ul><li>User1</li></ul>');
		return res.end();
	}

	if (url === '/create-user' && method === 'POST') {
		const body = [];

		req.on('data', chunk => body.push(chunk));

		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody);
			res.statusCode = 302;
			res.setHeader('Location', '/');
			return res.end();
		})
	}
})

server.listen(3000);

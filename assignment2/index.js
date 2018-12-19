const express = require('express');

const app = express();

app.use('/users', (req, res) => {
	res.send('users');
});

app.use('/', (req, res) => {
	res.send('index');
});

app.listen(3000);

// app.use((req, res, next) => {
// 	console.log('first middleware');
// 	next();
// });

// app.use((req, res, next) => {
// 	console.log('second middleware');
// 	next();
// });

// app.use((req, res, next) => {
// 	console.log('3rd middleware');
// 	res.send('hi')
// });


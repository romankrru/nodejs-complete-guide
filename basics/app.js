const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
	res.status(404).render('404', {
		pageTitle: '404',
	});
});

app.listen(3000, () => {
	console.log('Started on http://localhost:3000');
});

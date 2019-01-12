const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Add dummy user to request
app.use((req, res, next) => User.findByPk(1)

	.then(user => {
		req.user = user;
		next();
	})

	.catch(err => console.error(err)));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, {
	constraints: true,
	onDelete: 'CASCADE',
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
	.sync()
	// .sync({force: true})
	.then(() => User.findByPk(1))

	.then(user => {
		if (!user)
			return User.create({
				email: 'test@test.com',
				name: 'John',
			});

		return user;
	})

	.then(user => user.createCart())

	.then(() => {
		app.listen(3000);
		console.log('Started on http://localhost:3000');
	})

	.catch(err => console.error(err));

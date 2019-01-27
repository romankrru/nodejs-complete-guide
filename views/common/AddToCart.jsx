const React = require('react');

const CSRFInput = require('./CSRFInput');

const AddToCart = props => <form action="/cart" method="POST">
	<CSRFInput />
	<button className="btn btn-primary">Add to Cart</button>
	<input type="hidden" name="productId" value={props.productId} />
</form>;

module.exports = AddToCart;

const React = require('react');

const AddToCart = props => <form action="/cart" method="POST">
	<button className="btn btn-primary">Add to Cart</button>
	<input type="hidden" name="productId" value={props.productId} />
</form>;

module.exports = AddToCart;

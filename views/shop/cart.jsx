const React = require('react');
const _ = require('lodash');

const DefaultLayout = require('../layouts/default');

const Cart = props => {
	let content = <h1>Cart is empty</h1>;

	if (!_.isEmpty(props.products)) {
		content = <React.Fragment>
			<ul className="list-unstyled">
				{props.products.map(product => <li className="media mt-2 border" key={product._id}>
					<img src={`/${product.productId.imageUrl}`} className="cart-image m-2 img-thumbnail" alt="A Book" />

					<div className="media-body">
						<h5 className="mt-2 mb-1">
							{product.productId.title}
							<span className="ml-1 badge badge-secondary">{product.quantity}</span>
						</h5>

						<p><i>(${product.productId.price})</i></p>
						{product.productId.description}
					</div>

					<div>
						<form action="/cart-delete-product" method="POST">
							<input type="hidden" value={product.productId._id} name="productId"/>
							<button className="btn btn-danger mt-2 mr-2">Delete</button>
						</form>
					</div>
				</li>)}
			</ul>

			<hr/>

			<h5>
				Total Price: <b>${props.totalPrice}</b>
			</h5>

			<hr/>

			<a className="btn btn-primary" href="/checkout">Order now!</a>
		</React.Fragment>
	}

	return <DefaultLayout
		path={props.path}
		pageTitle={props.pageTitle}
	>
		{content}
	</DefaultLayout>;
};

module.exports = Cart;

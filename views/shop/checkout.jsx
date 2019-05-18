const React = require('react');

const DefaultLayout = require('../layouts/default');

const Checkout = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h2>Checkout:</h2>

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
		</li>)}
	</ul>

	<h3>Total: {props.totalSum}</h3>
</DefaultLayout>;

module.exports = Checkout;

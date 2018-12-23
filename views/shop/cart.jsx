const React = require('react');

const DefaultLayout = require('../layouts/default');

const Cart = props => {
	let content = <h1>Cart is empty</h1>;

	if (props.products) {
		content = <React.Fragment>
			<ul className="list-unstyled">
				{props.products.map(product => <li className="media mt-2 border" key={product.id}>
					<img src={product.imageUrl} className="cart-image m-2 img-thumbnail" alt="A Book" />

					<div className="media-body">
						<h5 className="mt-2 mb-1">
							{product.title}
							<span className="ml-1 badge badge-secondary">{product.qty}</span>
						</h5>

						<p><i>(${product.price})</i></p>
						{product.description}
					</div>

					<div>
						<button className="btn btn-danger mt-2 mr-2">Delete</button>
					</div>
				</li>)}
			</ul>

			<hr/>

			<h5>
				Total Price: <b>${props.totalPrice}</b>
			</h5>
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

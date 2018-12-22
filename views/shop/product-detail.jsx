const React = require('react');

const DefaultLayout = require('../layouts/default');

const ProductDetails = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h1>{props.product.title}</h1>
	<hr/>
	<div className="row">
		<div className="col-4">
			<img src={props.product.imageUrl} alt="" className="img-thumbnail"/>
		</div>

		<div className="col-8">
			<h3>${props.product.price}</h3>
			<p>{props.product.description}</p>

			<form action="/add-to-cart" method="POST">
				<button href="#" className="btn btn-primary">Add to Cart</button>
			</form>
		</div>
	</div>
</DefaultLayout>;

module.exports = ProductDetails;
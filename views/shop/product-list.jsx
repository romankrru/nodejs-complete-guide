const React = require('react');
const _  = require('lodash');

const DefaultLayout = require('../layouts/default');
const AddToCart = require('../common/AddToCart');

const ProductList = props => {
	let content = <h1>No products to display</h1>;

	if (props.prods.length) {
		content = _.chain(props.prods)
			.chunk(4)

			.map((chunk, i) => <div className="row" key={i}>
				{_.map(chunk, (product, j) => <div className="col-md-3 mb-3 mt-4" key={j}>
					<div className="card">
						<img src={product.imageUrl} className="card-img-top" alt=" ABook" />

						<div className="card-body">
							<h5 className="card-title">{product.title}</h5>
							<p className="card-text">{product.description}</p>
							<p className="card-text">${product.price}</p>
							<a href={`/products/${product._id}`}>Details</a>
							<AddToCart productId={product._id} />
						</div>
					</div>
				</div>)}
			</div>)

			.value();
	}


	return <DefaultLayout
		isLoggedIn={props.isLoggedIn}
		path={props.path}
		pageTitle={props.pageTitle}
	>
		{content}
	</DefaultLayout>
}

module.exports = ProductList;

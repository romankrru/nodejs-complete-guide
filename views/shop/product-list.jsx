const React = require('react');
const fp = require('lodash/fp');
const {LocalsContext} = require('express-react-static-markup');

const DefaultLayout = require('../layouts/default');
const AddToCart = require('../common/AddToCart');

const renderProductsRow = (row, i) => <div className="row" key={i}>
	{fp.map(product => <div className="col-md-3 mb-3 mt-4" key={product._id}>
		<div className="card">
			<img src={product.imageUrl} className="card-img-top" alt=" ABook" />

			<div className="card-body">
				<h5 className="card-title">{product.title}</h5>
				<p className="card-text">{product.description}</p>
				<p className="card-text">${product.price}</p>
				<a href={`/products/${product._id}`}>Details</a>

				<LocalsContext>
					{({isLoggedIn}) => isLoggedIn && <AddToCart productId={product._id} />}
				</LocalsContext>
			</div>
		</div>
	</div>, row)}
</div>;

const ProductList = props => {
	let content = <h1>No products to display</h1>;

	if (props.prods.length) {
		content =

		content = <div>
			{props.prods |> fp.chunk(4) |> fp.map(renderProductsRow)}
			<a href="/products/?page=1">1</a>{' | '}
			<a href="/products/?page=2">2</a>
		</div>
	}


	return <DefaultLayout
		path={props.path}
		pageTitle={props.pageTitle}
	>
		{content}
	</DefaultLayout>
};

module.exports = ProductList;

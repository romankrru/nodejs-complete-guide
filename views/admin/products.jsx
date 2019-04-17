const React = require('react');
const fp = require('lodash/fp');

const DefaultLayout = require('../layouts/default');
const CSRFInput = require('../common/CSRFInput');

const renderProductsRow = (row, i) => <div className="row" key={i}>
	{fp.map(product => <div className="col-md-3 mb-3 mt-4" key={product._id}>
		<div className="card">
			<img src={`/${product.imageUrl}`} className="card-img-top" alt=" ABook" />

			<div className="card-body">
				<h5 className="card-title">{product.title}</h5>
				<p className="card-text">{product.description}</p>
				<p className="card-text">${product.price}</p>

				<a
					href={`/admin/edit-product/${product._id}`}
					className="btn btn-primary mr-3"
				>
					Edit
				</a>

				<CSRFInput />

				<button
					id="delete-product-btn"
					className="btn btn-danger"
					data-product-id={product._id}
				>
					Delete
				</button>
			</div>
		</div>
	</div>, row)}
</div>;

const AdminProducts = props => {
	let content = <h1>No products to display</h1>;

	if (props.prods.length) {
		content = props.prods
			|> fp.chunk(4)
			|> fp.map(renderProductsRow);
	}

	return <DefaultLayout
		path={props.path}
		pageTitle={props.pageTitle}
	>
		<h1>Admin products</h1>
		<hr/>
		{content}
	</DefaultLayout>
}

module.exports = AdminProducts;

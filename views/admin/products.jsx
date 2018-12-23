const React = require('react');
const _  = require('lodash');

const DefaultLayout = require('../layouts/default');

const AdminProducts = props => {
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

							<form action="/admin/delete-product" method="POST">
								<a
									href={`/admin/edit-product/${product.id}`}
									className="btn btn-primary mr-3"
								>
									Edit
								</a>

								<input type="hidden" value={product.id} name="productId" />
								<button type="submit" className="btn btn-danger">Delete</button>
							</form>
						</div>
					</div>
				</div>)}
			</div>)
			.value();
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

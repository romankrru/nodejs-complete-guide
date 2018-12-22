const React = require('react');
const _  = require('lodash');

const DefaultLayout = require('../layouts/default');

const ProductList = props => {
	let content = <h1>No products to display</h1>;

	if (props.prods.length) {
		content = _.chain(props.prods)
			.chunk(4)
			.map((chunk, i) => <div class="row" key={i}>
				{_.map(chunk, (product, j) => <div class="col-md-3 mb-3 mt-4" key={j}>
					<div class="card">
						<img src={product.imageUrl} class="card-img-top" alt=" ABook" />

						<div class="card-body">
							<h5 class="card-title">{product.title}</h5>
							<p class="card-text">{product.description}</p>
							<p class="card-text">${product.price}</p>

							<form action="/add-to-cart" method="POST">
								<button href="#" class="btn btn-primary">Add to Cart</button>
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
		{content}
	</DefaultLayout>
}

module.exports = ProductList;

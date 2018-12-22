const React = require('react');
const _  = require('lodash');

const DefaultLayout = require('../layouts/default');

const Shop = props => {
	let content = <h1>No products to display</h1>;

	if (props.prods.length) {
		content = _.chain(props.prods)
			.chunk(4)
			.map(chunk => <div class="row">
				{_.map(chunk, product => <div class="col-md-3 mb-3 mt-4">
					<div class="card">
					<img src="https://duskrider3740.files.wordpress.com/2016/12/red-book.jpg" class="card-img-top" alt=" ABook" />
					<div class="card-body">
						<h5 class="card-title">{product.title}</h5>
						<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
						<a href="#" class="btn btn-primary">Add to Cart</a>
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

module.exports = Shop;

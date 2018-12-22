const React = require('react');
const DefaultLayout = require('../layouts/default');

const AddProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<form action="/admin/add-product" method="POST">
			<div class="form-group">
				<label for="title">Book Title</label>
				<input type="text" class="form-control" id="title" name="title" />
			</div>

			<button type="submit" class="btn btn-primary mb-2">Add product</button>
		</form>
	</main>
</DefaultLayout>;

module.exports = AddProduct;

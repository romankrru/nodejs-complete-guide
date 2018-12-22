const React = require('react');
const DefaultLayout = require('../layouts/default');

const AddProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<h1>Add product</h1>

		<form action="/admin/add-product" method="POST">
			<div class="form-group">
				<label htmlFor="title">Book Title</label>
				<input type="text" class="form-control" id="title" name="title" />
			</div>

			<div class="form-group">
				<label htmlFor="imageUrl">Image Url</label>
				<input type="text" class="form-control" id="imageUrl" name="imageUrl" />
			</div>

			<div class="form-group">
				<label htmlFor="Price">Price</label>
				<input type="number" class="form-control" id="price" name="price" />
			</div>

			<div class="form-group">
				<label htmlFor="Description">Description</label>
				<textarea type="number" class="form-control" id="description" name="description" rows={5}></textarea>
			</div>

			<button type="submit" class="btn btn-primary mb-2">Add product</button>
		</form>
	</main>
</DefaultLayout>;

module.exports = AddProduct;

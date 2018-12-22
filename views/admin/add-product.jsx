const React = require('react');
const DefaultLayout = require('../layouts/default');

const AddProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<h1>Add product</h1>

		<form action="/admin/add-product" method="POST">
			<div className="form-group">
				<label htmlFor="title">Book Title</label>
				<input type="text" className="form-control" id="title" name="title" />
			</div>

			<div className="form-group">
				<label htmlFor="imageUrl">Image Url</label>
				<input type="text" className="form-control" id="imageUrl" name="imageUrl" />
			</div>

			<div className="form-group">
				<label htmlFor="Price">Price</label>
				<input type="number" className="form-control" id="price" name="price" step="0.01" />
			</div>

			<div className="form-group">
				<label htmlFor="Description">Description</label>
				<textarea type="number" className="form-control" id="description" name="description" rows={5}></textarea>
			</div>

			<button type="submit" className="btn btn-primary mb-2">Add product</button>
		</form>
	</main>
</DefaultLayout>;

module.exports = AddProduct;

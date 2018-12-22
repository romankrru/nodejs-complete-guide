const React = require('react');
const DefaultLayout = require('../layouts/default');

const AddProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
	styles={["/css/forms.css", "/css/product.css"]}
>
	<main>
		<form className="product-form" action="/admin/add-product" method="POST">
			<div className="form-control">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" />
			</div>

			<button className="btn" type="submit">Add Product</button>
		</form>
	</main>
</DefaultLayout>;

module.exports = AddProduct;

const React = require('react');

const CSRFInput = require('../../common/CSRFInput');

const ProductForm = props => <form
	action={props.action}
	method="POST"
	encType="multipart/form-data"
>
	<CSRFInput />

	{Boolean(props.hasError) && <div className="alert alert-danger" role="alert">
		{props.errorMessage}
	</div>}

	<div className="form-group">
		<label htmlFor="title">Book Title</label>

		<input
			type="text"
			className="form-control"
			id="title"
			name="title"
			defaultValue={props.data.title}
		/>
	</div>

	{/* <div className="form-group">
		<label htmlFor="imageUrl">Image Url</label>

		<input
			type="text"
			className="form-control"
			id="imageUrl"
			name="imageUrl"
			defaultValue={props.data.imageUrl}
		/>
	</div> */}

	<div className="form-group">
		<label htmlFor="image">Image</label>

		<input
			type="file"
			className="form-control"
			id="image"
			name="image"
			// defaultValue={props.data.image}
		/>
	</div>

	<div className="form-group">
		<label htmlFor="Price">Price</label>

		<input
			type="number"
			className="form-control"
			id="price"
			name="price"
			step="0.01"
			defaultValue={props.data.price}
		/>
	</div>

	<div className="form-group">
		<label htmlFor="Description">Description</label>

		<textarea
			type="number"
			className="form-control"
			id="description"
			name="description"
			rows={5}
			defaultValue={props.data.description}
		/>
	</div>

	<button type="submit" className="btn btn-primary mb-2">
		{props.buttonTitle}
	</button>
</form>;

ProductForm.defaultProps = {
	data: {},
};

module.exports = ProductForm;

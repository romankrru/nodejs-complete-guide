const React = require('react');

const DefaultLayout = require('../layouts/default');

const EditProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Edit Product Page
</DefaultLayout>;

module.exports = EditProduct;

const React = require('react');

const DefaultLayout = require('../layouts/default');

const ProductDetails = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Product Details
</DefaultLayout>;

module.exports = ProductDetails;

const React = require('react');

const DefaultLayout = require('../layouts/default');

const Products = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Admin Products page
</DefaultLayout>;

module.exports = Products;

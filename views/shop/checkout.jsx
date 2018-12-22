const React = require('react');

const DefaultLayout = require('../layouts/default');

const Checkout = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Checkout Page
</DefaultLayout>;

module.exports = Checkout;

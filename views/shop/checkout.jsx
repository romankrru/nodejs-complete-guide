const React = require('react');

const DefaultLayout = require('../layouts/default');

const Checkout = props => <DefaultLayout
	isLoggedIn={props.isLoggedIn}
	path={props.path}
	pageTitle={props.pageTitle}
>
	Checkout Page
</DefaultLayout>;

module.exports = Checkout;

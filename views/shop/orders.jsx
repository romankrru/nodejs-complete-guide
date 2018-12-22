const React = require('react');

const DefaultLayout = require('../layouts/default');

const Orders = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Orders Page
</DefaultLayout>;

module.exports = Orders;

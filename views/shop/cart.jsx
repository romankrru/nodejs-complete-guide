const React = require('react');

const DefaultLayout = require('../layouts/default');

const Cart = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	Cart Page
</DefaultLayout>;

module.exports = Cart;

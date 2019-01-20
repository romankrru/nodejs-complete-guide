const React = require('react');
const DefaultLayout = require('./layouts/default');

const Page404 = props => <DefaultLayout
	isLoggedIn={props.isLoggedIn}
	pageTitle={props.pageTitle}
>
	<h1>Page not Found</h1>
</DefaultLayout>;

module.exports = Page404;

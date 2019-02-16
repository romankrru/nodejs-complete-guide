const React = require('react');
const DefaultLayout = require('./layouts/default');

const Page500 = props => <DefaultLayout
	pageTitle={props.pageTitle}
>
	<h1>500</h1>
	<h3>Some error occurred!</h3>
	<p>We are working on fixing this. Sorry for inconvenience!</p>
</DefaultLayout>;

module.exports = Page500;

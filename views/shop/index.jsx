const React = require('react');

const DefaultLayout = require('../layouts/default');

const Index = props => <DefaultLayout
	csrfToken={props.csrfToken}
	path={props.path}
	pageTitle={props.pageTitle}
>
	Index Page
</DefaultLayout>;

module.exports = Index;

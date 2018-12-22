const React = require('react');
const Navigation = require('./navigation');

const DefaultLayout = props => <html lang="en">
	<head>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
		<title>{props.pageTitle}</title>
		<link rel="stylesheet" href="/css/main.css" />

		{(props.styles || []).map(href => <link rel="stylesheet" href={href} key={href}/>)}
	</head>

	<body>
		<Navigation path={props.path} />
		{props.children}
	</body>
</html>;

module.exports = DefaultLayout;

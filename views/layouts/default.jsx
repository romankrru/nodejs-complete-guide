const React = require('react');
const Navigation = require('./Navigation');

const DefaultLayout = props => <html lang="en">
	<head>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="shortcut icon" href="/favicon.png" type="image/png" />
		<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
		<title>{props.pageTitle}</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"></link>
		<link rel="stylesheet" href="/css/main.css" />

		{(props.styles || []).map(href => <link rel="stylesheet" href={href} key={href}/>)}
	</head>

	<body>
		<Navigation path={props.path} />

		<div className="container">
			{props.children}
		</div>
	</body>
</html>;

module.exports = DefaultLayout;

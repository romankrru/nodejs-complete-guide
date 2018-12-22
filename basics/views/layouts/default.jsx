const React = require('react');

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
		<header className="main-header">
			<nav className="main-header__nav">
				<ul className="main-header__item-list">
					<li className="main-header__item">
						<a className={props.path === '/' ? 'active' : undefined} href="/">
							Shop
						</a>
					</li>

					<li className="main-header__item">
						<a className={props.path === '/admin/add-product' ? 'active' : undefined} href="/admin/add-product">
							Add Product
						</a>
					</li>
				</ul>
			</nav>
		</header>

		{props.children}
	</body>
</html>;

module.exports = DefaultLayout;

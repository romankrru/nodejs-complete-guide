const React = require('react');

const Navigation = props => <header className="main-header">
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
</header>;

module.exports = Navigation

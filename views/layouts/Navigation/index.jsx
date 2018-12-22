const React = require('react');

const NavLink = require('./NavLink');

const Navigation = props => <header className="main-header">
	<nav class="navbar navbar-expand navbar-dark bg-dark">
		<a class="navbar-brand" href="/">Shop</a>

		<div class="navbar-nav">
			<NavLink href="/" active={props.path === '/'}>Home</NavLink>
			<NavLink href="/products" active={props.path === '/products'}>Products</NavLink>
			<NavLink href="/cart" active={props.path === '/cart'}>Cart</NavLink>
			<NavLink href="/admin/add-product" active={props.path === '/admin/add-product'}>Add product</NavLink>
			<NavLink href="/admin/products" active={props.path === '/admin/products'}>Home</NavLink>
		</div>
	</nav>
</header>;

module.exports = Navigation

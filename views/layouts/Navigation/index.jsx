const React = require('react');

const NavLink = require('./NavLink');

const Navigation = props => <header className="main-header">
	<nav className="navbar navbar-expand navbar-dark bg-dark">
		<a className="navbar-brand" href="/">Shop</a>

		<div className="navbar-nav">
			<NavLink href="/" active={props.path === '/'}>Home</NavLink>
			<NavLink href="/products" active={props.path === '/products'}>Products</NavLink>
			<NavLink href="/cart" active={props.path === '/cart'}>Cart</NavLink>
			<NavLink href="/orders" active={props.path === '/orders'}>Orders</NavLink>
			{/* <NavLink href="/admin/add-product" active={props.path === '/admin/add-product'}>Add product</NavLink>
			<NavLink href="/admin/products" active={props.path === '/admin/products'}>Admin Products</NavLink> */}
			<NavLink href="/login" active={props.path === '/login'}>Login</NavLink>
		</div>
	</nav>
</header>;

module.exports = Navigation

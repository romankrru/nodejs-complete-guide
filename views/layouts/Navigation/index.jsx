const React = require('react');
const {LocalsContext} = require('express-react-static-markup');

const NavLink = require('./NavLink');
const CSRFInput = require('../../common/CSRFInput');

const Navigation = props => <LocalsContext>
	{({isLoggedIn}) => <header className="main-header">
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<a className="navbar-brand" href="/">Shop</a>

			<div className="navbar-nav">
				<NavLink href="/" active={props.path === '/'}>Home</NavLink>
				<NavLink href="/products/?page=1" active={props.path === '/products'}>Products</NavLink>

				{isLoggedIn && <React.Fragment>
					<NavLink href="/cart" active={props.path === '/cart'}>Cart</NavLink>
					<NavLink href="/orders" active={props.path === '/orders'}>Orders</NavLink>
					<NavLink href="/admin/add-product" active={props.path === '/admin/add-product'}>Add product</NavLink>
					<NavLink href="/admin/products/" active={props.path === '/admin/products'}>Admin Products</NavLink>
				</React.Fragment>}


				{isLoggedIn
					? <form method="POST" action="/logout">
						<CSRFInput />
						<button className="btn nav-item nav-link">Logout</button>
					</form>

					: <React.Fragment>
						<NavLink href="/login" active={props.path === '/login'}>Login</NavLink>
						<NavLink href="/signup" active={props.path === '/signup'}>Signup</NavLink>
					</React.Fragment>}
			</div>
		</nav>
	</header>}
</LocalsContext>;

module.exports = Navigation

const React = require('react');
const classnames = require('classnames');

const NavLink = props => <a
	class={classnames("nav-item nav-link", {
		active: props.active
	})}

	href={props.href}
>
	{props.children}
</a>;

module.exports = NavLink;

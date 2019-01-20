const React = require('react');

const DefaultLayout = require('../layouts/default');

const Login = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h1>Login</h1>

	<form>
		<div className="form-group" method="POST" action="/login">
			<label htmlFor="exampleInputEmail1">Email address</label>
			<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
			<small id="emailHelp" className="form-text text-muted">Enter your email</small>
		</div>

		<div className="form-group">
			<label htmlFor="exampleInputPassword1">Password</label>
			<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
		</div>

		<button type="submit" className="btn btn-primary">Login</button>
	</form>
</DefaultLayout>;

module.exports = Login;

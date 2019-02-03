const React = require('react');

const DefaultLayout = require('../layouts/default');
const CSRFInput = require('../common/CSRFInput');

const Login = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h1>Reset password</h1>

	<form method="POST" action="/reset">
		<CSRFInput />

		{Boolean(props.errorMessage.length) && <div className="alert alert-danger" role="alert">
			{props.errorMessage}
		</div>}

		<div className="form-group">
			<label htmlFor="exampleInputEmail1">Email address</label>
			<input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
			<small id="emailHelp" className="form-text text-muted">Enter your email</small>
		</div>

		<button type="submit" className="btn btn-primary">Reset password</button>
	</form>
</DefaultLayout>;

module.exports = Login;

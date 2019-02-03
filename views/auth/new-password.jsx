const React = require('react');

const DefaultLayout = require('../layouts/default');
const CSRFInput = require('../common/CSRFInput');

const NewPassword = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h1>Create new password</h1>

	<form method="POST" action="/new-password">
		<CSRFInput />

		{Boolean(props.errorMessage.length) && <div className="alert alert-danger" role="alert">
			{props.errorMessage}
		</div>}

		<div className="form-group">
			<label htmlFor="exampleInputPassword1">Password</label>
			<input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
		</div>

		<input type="hidden" value={props.userId} name="userId" />
		<input type="hidden" value={props.passwordToken} name="passwordToken" />

		<button type="submit" className="btn btn-primary">Update password</button>
	</form>
</DefaultLayout>;

module.exports = NewPassword;

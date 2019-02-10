const React = require('react');

const DefaultLayout = require('../layouts/default');
const CSRFInput = require('../common/CSRFInput');

const Signup = props => {
	const oldInput = props.oldInput || {};

	return <DefaultLayout
		path={props.path}
		pageTitle={props.pageTitle}
	>
		<h1>Signup</h1>

		<form method="POST" action="/signup" noValidate>
			<CSRFInput />

			{Boolean(props.errorMessage.length) && <div className="alert alert-danger" role="alert">
				{props.errorMessage}
			</div>}

			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>

				<input
					defaultValue={oldInput.email}
					name="email"
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				/>

				<small id="emailHelp" className="form-text text-muted">Enter your email</small>
			</div>

			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>

				<input
					defaultValue={oldInput.password}
					name="password"
					type="password"
					className="form-control"
					id="exampleInputPassword1"
					placeholder="Password"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleInputPassword2">Confirm Password</label>

				<input
					defaultValue={oldInput.confirmPassword}
					name="confirmPassword"
					type="password"
					className="form-control"
					id="exampleInputPassword2"
					placeholder="Confirm Password"
				/>
			</div>

			<button type="submit" className="btn btn-primary">Signup</button>
		</form>
	</DefaultLayout>;
};

module.exports = Signup;

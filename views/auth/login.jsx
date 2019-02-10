const React = require('react');
const fp = require('lodash/fp');
const {_} = require('param.macro');
const cx = require('classnames');

const DefaultLayout = require('../layouts/default');
const CSRFInput = require('../common/CSRFInput');

const Login = props => {
	const oldInput = props.oldInput || {};
	const invalidFields = props.invalidFields || [];
	const isInvalid = fp.includes(_, invalidFields);

	return <DefaultLayout
		path={props.path}
		pageTitle={props.pageTitle}
	>
		<h1>Login</h1>

		<form method="POST" action="/login" noValidate>
			<CSRFInput />

			{Boolean(props.errorMessage.length) && <div className="alert alert-danger" role="alert">
				{props.errorMessage}
			</div>}

			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>

				<input
					name="email"
					type="email"
					defaultValue={oldInput.email}

					className={cx('form-control', {
						'is-invalid': isInvalid('email'),
					})}

					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				/>

				<small id="emailHelp" className="form-text text-muted">Enter your email</small>
			</div>

			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>

				<input
					name="password"
					type="password"
					defaultValue={oldInput.password}

					className={cx('form-control', {
						'is-invalid': isInvalid('password'),
					})}

					id="exampleInputPassword1"
					placeholder="Password"
				/>
			</div>

			<button type="submit" className="btn btn-primary">Login</button>
		</form>

		<hr/>
		<a href="/reset">Reset password</a>
	</DefaultLayout>;
};

module.exports = Login;

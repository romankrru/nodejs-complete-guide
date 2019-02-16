const handleError = next => err => {
	console.log(err);
	const error = new Error(err);
	error.httpStatusCode = 500;
	return next(error);
};

module.exports = handleError;

const {_} = require('param.macro');
const fp = require('lodash/fp');

const log = a => (console.log(a), a);

const handleError = next => fp.flow(
	log,
	new Error(_),
	fp.set('httpStatusCode', '500'),
	next,
);

module.exports = handleError;

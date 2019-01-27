const React = require('react');
const {LocalsContext} = require('express-react-static-markup');

const CSRFInput = () => <LocalsContext>
	{(locals) => <input type="hidden" value={locals.csrfToken} name="_csrf"/>}
</LocalsContext>;

module.exports = CSRFInput;

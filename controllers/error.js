exports.get404 = (req, res) => {
	res.status(404).render('404', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: '404',
	});
};

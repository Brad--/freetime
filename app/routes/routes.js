'use strict';

// User Navigation Routes:
//	/: Landing Page. About us & Login
//	/profile: Main app

var path = process.cwd();

module.exports = function(app, passport) {
	var authRedirect = {
		successRedirect: '/profile',
		failureRedirect: '/'
	};

	// Check if user is already logged in
	function loggedIn(req, res, next) {
	    if (req.user) {
	        next();
	    } else {
	        res.redirect('/');
	    }
	}

	// Leave the call to loggedIn - authenticated users will go straight to the content!
	app.route('/')
		.get(loggedIn, (req, res) => {
			res.sendFile(path + "/public/index.html");
		});

	app.route('/profile')
		.get(loggedIn, (req, res) => {
			res.sendFile(path + "/public/profile.html");
		});


// Auth routes
	app.get('/auth/facebook', 
		passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/'}),
		function(req, res) {
			res.redirect('/profile');
		});
// End Auth routes



	// Send data.csv for use by d3
	// This should be gone eventually, this was for testing d3 with a static CSV
	app.route('/data')
		.get(loggedIn, (req, res) => {
			var options = {
				root: path,
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};

			res.sendFile("/app/data.csv", options, err => {
				if (err) 
					throw err;
			});
	});
	
}
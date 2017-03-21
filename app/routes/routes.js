'use strict';

var path = process.cwd();

module.exports = function(app, passport) {
	// Check if user is already logged in
	function loggedIn(req, res, next) {
	    if (req.user) {
	        next();
	    } else {
	        res.redirect('/');
	    }
	}

	function auth(strat) {
		passport.authenticate(strat, {
			successRedirect: '/tbd',
			failureRedirect: '/'
		});
	}
	// Leave the call to loggedIn - authenticated users will go straight to the content!
	app.route('/')
		.get(loggedIn, (req, res) => {
			res.sendFile(path + "/public/index.html");
		});

	app.route('/tbd')
		.get(loggedIn, (req, res) => {
			res.sendFile(path + "/public/lol.html");
		});


// Auth routes
	app.get('/auth/facebook', (req, res) => {
			passport.authenticate('facebook');
		});
	app.get('auth/facebook/callback', (req, res) => {
			passport.authenticate('facebook', {failureRedirect: '/'}),
			function onSuccess(req, res) {
				res.redirect('/tbd');
			}
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
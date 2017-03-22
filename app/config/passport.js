'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {
	passport.serializeUser((user, cb) => {
		cb(null, user);
	});
	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});

	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_KEY,
		clientSecret: process.env.FACEBOOK_SECRET,
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	(accessToken, refreshToken, profile, done) => {
		// User.findOrCreate({ facebookId: profile.id }, 
		// (err, user) => {
		// 	return cb(err, user);
		// });
		return done(null, profile);
	}
	));
}
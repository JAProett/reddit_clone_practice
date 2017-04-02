var express = require("express");
	router = express.Router();
	knex = require("../db/knex")


// for '/users' handling (this is where .post, .delete & .put will be included)
router.route('/')
	.post((req, res) => {
		knex('users')
			.insert({
				full_name: req.body.user.full_name,
				username: req.body.user.username,
				img_url: req.body.user.img_url
			})
			.returning('id')
			.then(function(id) {
				res.redirect(`/users/${id}`);
			});
	});


// this is where users will go to add a new user
router.route("/new")
	.get(function(req, res){
	  res.render('users/new');
	});

module.exports = router;

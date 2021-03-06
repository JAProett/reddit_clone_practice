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
            .then((id) => {
                res.redirect(`/users/${id}`);
            });
    })
    .get((req, res) => {
        knex('users')
            .select('id', 'username')
            .orderBy('id', 'asc')
            .then((users) => {
                // render the view engine template w/ users passed in
                res.render('users/index', {
                    // the users key & value are the same so this is {users: users}
                    users
                });
            });
    });


// this is where users will go to add a new user
router.route("/new")
    .get((req, res) => {
        res.render('users/new');
    });

// this handles a specific id route
router.route('/:id')
    .delete((req, res) => {
        knex('users')
            .del()
            .where({
                id: req.params.id
            })
            .then(() => {
                res.redirect(`/users`);
            });
    })
    .get((req, res) => {
        knex('users')
            .select('id', 'username', 'full_name', 'img_url')
            .where({
                id: req.params.id
            })
            // limit 1
            .first()
            .then((user) => {
                // this passes the user to the ejs template
                res.render('users/show', {
                    user
                });
            });
    })
    .put((req, res) => {
        knex('users')
            .update({
                full_name: req.body.user.full_name,
                username: req.body.user.username,
                img_url: req.body.user.img_url
            })
            .where({
                id: req.params.id
            })
            .then(() => {
                res.redirect(`/users/${req.params.id}`);
            });
    });

// this handles editing a single users
router.route('/:id/edit')
    .get((req, res) => {
        knex('users')
            .select('id', 'username', 'full_name', 'img_url')
            .where({
                id: req.params.id
            })
            // limit 1
            .first()
            .then((user) => {
                // this passes the user to the ejs template
                res.render('users/edit', {
                    user
                });
            });
    });

router.route('/:id/delete')
    .get(function(req, res) {
        knex('users')
            .select('id', 'username')
            .where({
                id: req.params.id
            })
            .first()
            .then(function(user) {
                res.render('users/delete', {
                    user
                });
            });
    });

router.route('/:id/posts/new')
    .get(function(req, res) {
		res.render('posts/new');
    })

router.route('/:id/posts')
    .get(function(req, res) {
        knex('posts')
            .select('title', 'content')
            .where({
                id: req.params.id
            })
            .then(function(posts) {
                res.render('posts/show', {
                	posts
                });
            });
    })
    .post(function(req, res) {
        knex('posts').insert({
				user_id: req.params.id,
				title: req.body.title,
				content: req.body.content
			}
		).then(function(posts) {
                res.redirect(`${req.params.id}/posts`)
            });
    });

module.exports = router;

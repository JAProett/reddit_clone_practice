var express = require("express");
router = express.Router();
knex = require("../db/knex")


// for '/users' handling (this is where .post, .delete & .put will be included)
router.route('/')
    // .post((req, res) => {
    //     knex('posts')
    //         .insert({
    //             user_id: parseInt(req.body.post.user_id),
    //             title: req.body.post.title,
    //             content: req.body.post.content
    //         })
    //         .returning('id')
    //         .then((id) => {
    //             res.redirect(`/posts/${id}`);
    //         });
    // })
    .get((req, res) => {
        knex('posts')
            .select('id', 'user_id', 'title', 'content')
            .orderBy('id', 'asc')
            .then((posts) => {
                // render the view engine template w/ users passed in
                res.render('posts/index', {
                    // the users key & value are the same so this is {users: users}
                    posts
                });
            });
    });



module.exports = router;

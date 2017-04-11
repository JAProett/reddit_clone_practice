var express = require("express");
router = express.Router();
knex = require("../db/knex")


// for '/users' handling (this is where .post, .delete & .put will be included)
router.route('/')
    .post((req, res) => {
        knex('comments')
            .insert({
                comment_id: parseInt(req.body.comment.user_id),
                post_id: req.body.comment.post_id,
                content: req.body.comment.content
            })
            .returning('id')
            .then((id) => {
                res.redirect(`/comments/${id}`);
            });
    })
    .get((req, res) => {
        knex('comments')
            .select('id', 'post_id', 'user_id', 'content')
            .orderBy('id', 'asc')
            .then((comments) => {
                // render the view engine template w/ users passed in
                res.render('comments/index', {
                    // the users key & value are the same so this is {users: users}
                    comments
                });
            });
    });



module.exports = router;

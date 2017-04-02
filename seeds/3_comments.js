exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({user_id: 2, post_id: 3, content: 'That is cool!'}),
    knex('comments').insert({user_id: 1, post_id: 2, content: 'Excellent post!'}),
    knex('comments').insert({user_id: 3, post_id: 1, content: 'I agree!'})
  );
};

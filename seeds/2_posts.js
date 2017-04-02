exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({user_id: 2, title: 'Hello World', content: 'Blah blah'}),
    knex('posts').insert({user_id: 3, title: 'Hello Mars', content: 'La di da'}),
    knex('posts').insert({user_id: 1, title: 'Hello There', content: 'Yada yada yada'})
  );
};

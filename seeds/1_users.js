exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username: 'ctate', full_name: 'Chris', img_url: 'a.jpg'}),
    knex('users').insert({username: 'charlie', full_name: 'Charles', img_url: 'b.jpg'}),
    knex('users').insert({username: 'bets', full_name: 'Betsey', img_url: 'c.jpg'})
  );
};

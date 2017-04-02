exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table){
  	table.increments().primary();
    table.bigInteger("user_id").unsigned().index().references('id').inTable('users').onDelete('cascade');
    table.bigInteger("post_id").unsigned().index().references('id').inTable('posts').onDelete('cascade');
    table.text("content");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};

exports.seed = function(knex) {
  return knex('users').insert([
      {
          username: 'admin',
          password: "admin_pw",
          department: "Dispatch"
      },
      {
          username: 'user',
          password: "user_pw",
          department: "Warehouse"
      },
  ]);
};

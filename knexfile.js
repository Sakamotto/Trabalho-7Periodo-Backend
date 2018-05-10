// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'loja-virtual',
      user:     'postgres',
      password: 'admin@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-107-20-249-68.compute-1.amazonaws.com',
      port: 5432,
      user: 'beiqcsgqvayznb',
      password: '75fd12d8247532cff0b9ea131ebc1d5216d5ceb6abde7cb66ea28c7be3a34e4d',
      database: 'd3o0mntviru92n',
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

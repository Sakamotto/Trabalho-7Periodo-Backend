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
      host: 'ec2-107-21-126-193.compute-1.amazonaws.com',
      port: 5432,
      database: 'd65sn1id6ee71g',
      user:     'splfaklcaaqetu',
      password: 'f2f64fedb88dd629798962a27e48193504a4288239717c6f2ccbd67bb11e9b3c',
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

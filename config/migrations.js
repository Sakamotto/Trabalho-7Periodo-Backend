// config/migrations.js
module.exports.migrations = {
    // connection name matches a field from config/connections.js
    // localPostgres: {
    //     adapter: 'sails-postgresql',
    //     url: 'postgresql://postgres:admin@123@localhost:5432/loja-virtual'
    // },
    connection: 'localPostgres',
    datastore: 'localPostgres',
    table: 'sails_migrations',
    migrationsDir: 'sails_migrations',
};
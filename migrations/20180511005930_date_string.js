
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('cliente', function(t){
          t.dropColumn('cadastroEm');
          t.string('dataCadastro').defaultTo(new Date().toISOString());
        })
    ]);
};

exports.down = function(knex, Promise) {
  
};

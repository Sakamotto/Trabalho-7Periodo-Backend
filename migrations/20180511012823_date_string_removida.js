
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('cliente', function(t){
            t.string('dataCadastro').nullable().alter();
            // t.dropColumn('dataCadastro');
        })
    ]);  
};

exports.down = function(knex, Promise) {
  
};


exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('produto', function(t){
            t.foreign('categoriaId').references('id').inTable('categoria');
        })
    ]);  
};

exports.down = function(knex, Promise) {
  
};

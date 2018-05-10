
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('categoria', function(t) {
            t.increments('id');
            t.string('nome').notNull();
            t.text('descricao').nullable();
            t.decimal('desconto', 6, 2).notNull();
            t.string('teste').nullable();
        }),

        knex.schema.alterTable('cliente', function(t) {
            t.increments('id');
            t.string('nome').notNull();
            t.string('sobrenome').notNull();
            t.string('email').notNull();
            t.string('senha').notNull();
            t.datetime('dataNascimento').nullable();
            t.timestamp('dataCadastro').defaultTo(knex.fn.now());
            t.boolean('ativo').defaultTo(true);
            t.string('cpf').nullable();
            t.string('telefone').nullable();

        }),

        knex.schema.alterTable('produto', function(t) {
            t.increments('id');
            t.integer('categoriaId').unsigned().notNullable();
            t.string('nome').notNull();
            t.string('tamanho').nullable();
            t.text('descricao').nullable();
            t.decimal('custo', 6, 2).notNull();
            t.string('modelo').notNull();
            t.boolean('destaque').nullable();
            t.integer('quantidade').nullable();
            t.string('imagem').notNull();
            // t.foreign('categoriaId').references('id').inTable('categoria');
            // t.integer('categoriaId').references('categoria.id');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('produto'),
        knex.schema.dropTable('categoria'),
        knex.schema.dropTable('cliente')
      ]);
};

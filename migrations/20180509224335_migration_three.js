
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('categoria', function(t) {
            t.increments('id');
            t.string('nome').notNull();
            t.text('descricao').nullable();
            t.decimal('desconto', 6, 2).notNull();
            t.string('teste').nullable();
        }),

        knex.schema.createTable('cliente', function(t) {
            t.increments('id');
            t.integer('enderecoId').unsigned().nullable();
            t.string('nome').notNull();
            t.string('sobrenome').notNull();
            t.boolean('isAdmin').nullable().defaultTo(false);
            t.string('email').notNull();
            t.string('senha').notNull();
            t.string('dataNascimento').nullable();
            t.string('dataCadastro').nullable();
            t.boolean('ativo').defaultTo(true);
            t.string('cpf').nullable();
            t.string('telefone').nullable();
            t.foreign('enderecoId').references('id').inTable('endereco');
        }),

        knex.schema.createTable('produto', function(t) {
            t.increments('id');
            t.integer('categoriaId').unsigned().notNullable();
            t.integer('fornecedorId').unsigned().nullable();
            t.string('nome').notNull();
            t.string('tamanho').nullable();
            t.text('descricao').nullable();
            t.decimal('custo', 6, 2).notNull();
            t.string('modelo').notNull();
            t.boolean('destaque').nullable();
            t.integer('quantidade').nullable();
            t.string('imagem').notNull();
            t.foreign('categoriaId').references('id').inTable('categoria');
            t.foreign('fornecedorId').references('id').inTable('fornecedor');
        }),

        knex.schema.createTable('fornecedor', function(t) {
            t.increments('id');
            t.string('razaoSocial').notNull();
            t.string('cnpj').nullable();
            t.string('email').nullable();
            t.string('telefone').notNull();
            t.string('cep').nullable();
        }),

        knex.schema.createTable('endereco', function(t) {
            t.increments('id');
            t.string('cep').notNull();
            t.string('rua').nullable();
            t.string('bairro').nullable();
            t.string('cidade').nullable();
            t.string('estado').nullable();
            t.string('uf').nullable();
        }),


    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('produto'),
        knex.schema.dropTable('categoria'),
        knex.schema.dropTable('cliente'),
        knex.schema.dropTable('fornecedor'),
        knex.schema.dropTable('endereco')
      ]);
};

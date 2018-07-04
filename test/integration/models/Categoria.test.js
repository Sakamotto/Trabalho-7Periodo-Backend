var inspect = require('util');
/*
  *    
*/
describe('Quando pesquisar um categoria pelo id', function () {
    describe('#findOneCategory()', function () {
        it('deve retornar uma categoria de produto', function (done) {
            Categoria.findOne(1)
                .then(function (categoria) {
                    if (!categoria) {
                        return done(new Error(
                            `O teste deve retorna exatamente uma categoria, 
                            mas ao invés disso retornou`+ inspect(categoria, { depth: null }) + ''
                        ));
                    }
                    return done();
                }).catch(done);
        });
    });
});


describe('Quando pesquisar todos as categorias', function () {
    describe('#findAllCategories()', function () {
        it('deve retornar uma lista com todas as categorias', function (done) {
            Categoria.find()
                .then(function (categoria) {
                    if (!categoria) {
                        return done(new Error(
                            `O teste deve retorna todos as categorias, 
                            mas ao invés disso retornou`+ inspect(categoria, { depth: null }) + ''
                        ));
                    }
                    return done();
                }).catch(done);
        });
    });
});
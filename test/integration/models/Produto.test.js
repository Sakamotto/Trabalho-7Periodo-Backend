var inspect = require('util');
/*
  *    
*/
describe('Quando pesquisar um Produto pelo id', function () {
    describe('#findOneProduct()', function () {
        it('deve retornar um produto', function (done) {
            Produto.findOne(3)
                .then(function (produto) {
                    if (!produto) {
                        return done(new Error(
                            `O teste deve retorna exatamente um produto, 
                            mas ao invés disso retornou`+ inspect(produto, { depth: null }) + ''
                        ));
                    }
                    return done();
                }).catch(done);
        });
    });
});


describe('Quando pesquisar todos os produtos', function () {
    describe('#findAllProducts()', function () {
        it('deve retornar uma lista com todos os produtos', function (done) {
            Produto.find()
                .then(function (produto) {
                    if (!produto) {
                        return done(new Error(
                            `O teste deve retorna todos os produtos, 
                            mas ao invés disso retornou`+ inspect(produto, { depth: null }) + ''
                        ));
                    }
                    return done();
                }).catch(done);
        });
    });
});
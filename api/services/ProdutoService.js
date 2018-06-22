module.exports = {

    // findAll: function(paramFiltro) {
    //
    //     let filtros = {};
    //     let condicoes = {};
    //
    //     if (paramFiltro) {
    //         paramFiltro = JSON.parse(paramFiltro);
    //         var qtdProdutos = await Produto.count();
    //         var qtdPaginas = Math.ceil(qtdProdutos / (paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10));
    //         filtros.limit = paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10;
    //         filtros.skip = (paramFiltro.paginaAtual - 1) * filtros.limit;
    // 
    //         // Verificação filtros where
    //
    //         if (paramFiltro.nome) {
    //             condicoes.nome = paramFiltro.nome;
    //         }
    //
    //         if (paramFiltro.categoriaId) {
    //             condicoes.categoria = paramFiltro.categoriaId;
    //         }
    //
    //     }
    //
    //     //.where({categoria: paramFiltro.categoriaId}) it works!
    //     Produto.find(filtros).populate('exemplarprodutos').populate('imagens').populate('categoria').where(condicoes).exec((err, produtos) => {
    //         if (err) res.status(500).send({ error: 'Erro ao buscar produtos', erro: err });
    //         res.status(200).send(produtos);
    //     });
    //
    // }

}

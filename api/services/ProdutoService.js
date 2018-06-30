const http = require('http');
var parser = require('xml2js');

module.exports = {

    testeService: async function () {
        console.log('Serviço');
        let listaProdutos = await Produto.find({});
        console.log('Produtos: ', listaProdutos);
    },

    calcularFrete: function (cep) {
        let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPreco?nCdEmpresa=&sDsSenha=&sCepOrigem=74380150&sCepDestino=43810040&nVlPeso=5&nCdFormato=1&nVlComprimento=16&nVlAltura=5&nVlLargura=15&nVlDiametro=0&sCdMaoPropria=s&nVlValorDeclarado=200&sCdAvisoRecebimento=n&nCdServico=40010,41106&StrRetorno=xml';
        let output = '';
        // http.request();
        http.get(url, res => {

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                var obj = '';
                return output;
                // onResult();
                // parser.parseString(output, (err, result) => {
                //     obj = result;
                //     return obj;
                // });
            });
        });
    }

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

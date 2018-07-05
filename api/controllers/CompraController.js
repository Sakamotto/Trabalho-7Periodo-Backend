module.exports = {

    finalizarCompra: async function (req, res) {
        let clienteId = req.param('clienteId');
        let exemplares = req.param('exemplares');
        let totalCompra = req.param('totalCompra');
        let quantidade = req.param('quantidade') ? req.param('quantidade') : 1;
        let desconto = req.param('desconto') ? req.param('desconto') : 0;

        try {
            for (let i = 0; i < exemplares.length; i++) {
                let exemplar = await ExemplarProduto.findOne({ id: exemplares[i] }).populate('produto');

                // Criação do Exemplar
                let item = {
                    quantidade: quantidade,
                    valor: exemplar.produto.venda,
                    desconto: desconto,
                    exemplarproduto: exemplar.id
                };

                let newItemCompra = await ItemCompra.create(item).fetch();

                // Criação da Compra
                let compra = {
                    total: totalCompra,
                    dataPagamento: new Date().toISOString(),
                    cliente: clienteId,
                    itemCompra: newItemCompra.id
                };

                await Compra.create(compra);
            }
            res.status(200).send({ mensagem: 'Compra realizada com sucesso!' });
        } catch (error) {
            res.status(200).send({ erro: error, mensagem: 'Ocorreu um erro durante a finalização da compra' });
        }
    },

    getMinhasCompras: async function (req, res) {
        let clienteId = req.param('clienteId');

        if (clienteId) {
            try {
                let compras = await Compra.find({ cliente: clienteId }).populate('itemCompra');

                for (let i = 0; i < compras.length; i++) {
                    let exemplarComprado = await ExemplarProduto.findOne({id: compras[i].itemCompra.exemplarproduto}).populate('produto');
                    let imagens = await Imagem.find({produtoId: exemplarComprado.produto.id});
                    exemplarComprado.produto.imagens = imagens;
                    compras[i].exemplar = exemplarComprado;
                }

                res.status(200).send(compras);
            } catch (error) {
                res.status(200).send({ erro: error, mensagem: 'Ocorreu um erro ao obter compras' });
            }
        } else {
            res.status(200).send({ mensagem: 'O Id do cliente precisa ser fornecido!' });
        }
    }
}
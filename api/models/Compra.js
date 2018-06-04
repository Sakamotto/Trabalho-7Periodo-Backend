/**
 * Compra.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 /*
 http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=74380150&sCepDestino=43810040&nVlPeso=5&nCdFormato=1&nVlComprimento=16&nVlAltura=5&nVlLargura=15&nVlDiametro=0&sCdMaoPropria=s&nVlValorDeclarado=200&sCdAvisoRecebimento=n&StrRetorno=xml&nCdServico=40010,41106
 */

module.exports = {

    attributes: {
        //Attributes

        total: { type: 'number', required: true },
        dataPagamento: { type: 'string' },
        venda: { type: 'number' },
        descricao: { type: 'string' },
        tamanho: { type: 'string' },

        // Associations
        cliente: {
            model: 'cliente',
            columnName: 'clienteId',
            required: true
        },

        itemCompra: {
            model: 'itemCompra',
            columnName: 'itemCompraId',
            required: true
        },
    },


};


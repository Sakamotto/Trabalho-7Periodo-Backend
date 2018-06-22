/**
 * ItemCompra.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        //Attributes
        quantidade: { type: 'number', required: true },
        valor: { type: 'number', required: true },
        desconto: { type: 'number' },

        // Associations
        exemplarproduto: {
            model: 'exemplarproduto',
            columnName: 'exemplarprodutoId',
            required: true
        },

    },


};


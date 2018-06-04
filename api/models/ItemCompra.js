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
        valor: { type: 'number' },
        desconto: { type: 'number' },

        // Associations
        produto: {
            model: 'produto',
            columnName: 'produtoId',
            required: true
        },

    },


};


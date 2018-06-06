/**
 * Produtos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Attributes
	  quantidade:{type: 'number', required: true},

    // Associations
    tamanhoId: {
      model: 'tamanho',
    },

    imagemId:{
      model: 'imagem'
    }
  },

};

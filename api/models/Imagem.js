/**
 * Produtos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Attributes

    link:{type: 'string', required: true},
    nome:{type: 'string'},
    descricao:{type: 'string'},
    linkThumb:{type: 'string'},

    produtoId: {
      model: 'produto'
    }
  }

};

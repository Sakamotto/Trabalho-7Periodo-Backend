/**
 * Produtos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Attributes

    nome:{type: 'string'}, // P, M, G, GG, etc ...
    numero:{type: 'number'},
    altura:{type: 'number'},
    largura:{type: 'number'},

    // adicionando uma referência para produto, para que através do tamanha, eu consiga popular todos os produtos pertencentes à este tamanho.
    produtos: {
      collection: 'produto',
      via: 'tamanho',
      through: 'produtotamanho'
    }

  }

};

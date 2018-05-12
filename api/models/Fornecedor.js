/**
 * Produtos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Attributes

    razaoSocial:{type: 'string'},
    email:{type: 'string'},
    cnpj:{type: 'string'},
    telefone:{type: 'string'},
    cep:{type: 'string'},
    
    // Associations
  }

};


/**
 * Produtos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Attributes

    nome:{type: 'string', required: true},
    marca:{type: 'string'},
	  quantidade:{type: 'number', required: true},
	  custo:{type: 'number', required: true},
	  venda:{type: 'number'},
    descricao:{type: 'string'},
    tamanho:{type: 'string'},
    modelo:{type: 'string'},
    destaque:{type: 'boolean'},
    // imagem:{type: 'string'},

    // Associations
    categoria:{
      model:'categoria',
      columnName:'categoriaId',
      required: false // deve ser TRUE
    },

    // nesta relação, eu estou dizendo que Produto possui uma coleção (ou um conjunto) de tamanhos
    tamanhos:{
      collection: 'tamanho',
      via: 'produto',
      through: 'produtotamanho'
    },

    imagens:{
      collection: 'imagem',
      via: 'produtoId'
    },

    fornecedores: {
      collection: 'fornecedor',
      via: 'produto'
    }
  },

  validar: function(){
    erros = new Array();
    if(!this.attributes.nome){
      erros.push({mensagem: 'O nome do produto deve ser preenchido!', sucesso: false});
    }

    if(this.attributes.custo === null){
      erros.push({mensagem: 'O custo do produto deve ser preenchido!', sucesso: false});
    }

    return erros;
  }

};

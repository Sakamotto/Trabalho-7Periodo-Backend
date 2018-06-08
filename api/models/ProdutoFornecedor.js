module.exports = {

  attributes: {
    //Attributes

    // adicionando uma referência para produto, para que através do tamanha, eu consiga popular todos os produtos pertencentes à este tamanho.
    produtoId: {
      model: 'produto'
    },

    fornecedorId: {
      model: 'fornecedor'
    }

  }

};

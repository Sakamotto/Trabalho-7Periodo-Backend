/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Imagem.count() > 0 || await Produto.count() > 0) {
    return done();
  }

  await Categoria.createEach([
    { nome: 'Categoria A' ,descricao: 'Primeiro eu queria cumprimentar os internautas. -Oi Internautas!' },
    { nome: 'Categoria B' ,descricao: 'Se hoje é o dia das crianças... Ontem eu disse: o dia da criança é o dia da mãe, dos pais, das professoras, mas também é o dia dos animais, sempre que você olha uma criança, há sempre uma figura oculta, que é um cachorro atrás. O que é algo muito importante!' },
    { nome: 'Categoria C' ,descricao: 'A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil' },
    { nome: 'Categoria D' ,descricao: 'Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!'},
    { nome: 'Categoria E' ,descricao: 'Todos as descrições das pessoas são sobre a humanidade do atendimento, a pessoa pega no pulso, examina, olha com carinho' }
  ]);

  await Produto.createEach([
    {nome: 'Produto Teste 1', marca: 'Oracle', quantidade: 100, custo: 20, venda: 50, descricao: 'Descrição sobre o produto bem aqui ...'},
    {nome: 'Produto Teste 2', marca: 'Calvin Klein', quantidade: 100, custo: 20, venda: 50, descricao: 'Descrição sobre o produto bem aqui ...'},
    {nome: 'Produto Teste 3', marca: 'Nike', quantidade: 100, custo: 20, venda: 50, descricao: 'Descrição sobre o produto bem aqui ...'},
    {nome: 'Produto Teste 4', marca: 'Marca Desconhecida', quantidade: 100, custo: 20, venda: 50, descricao: 'Descrição sobre o produto bem aqui ...'},
  ]);

  await Imagem.createEach([
    { link: 'https://media.timeout.com/images/100561367/image.jpg' ,nome: 'Ryan Dahl', produtoId: 1 },
    { link: 'https://http2.mlstatic.com/blusa-t-shirt-feminina-california-paradise-cove-D_NQ_NP_773011-MLB20459463925_102015-F.jpg' ,nome: 'Ryan Dahl', produtoId: 1  },
    { link: 'https://www.ideiasmix.com/wp-content/uploads/2016/08/fotos-de-t-shirts-femininas.jpg' ,nome: 'Ryan Dahl', produtoId: 2 },
    { link: 'https://tudocommoda.com/wp-content/uploads/2016/04/t-shirt-feminina-55.jpg' ,nome: 'Ryan Dahl', produtoId: 2 },
    { link: 'https://ae01.alicdn.com/kf/HTB10uyiXbsTMeJjy1zcq6xAgXXao/2017-pants-skirt-cintura-alta-cal-as-mulheres-larga-roupas-feminina-women-calca-plus-size-feminina.jpg_640x640.jpg' ,nome: 'Ryan Dahl', produtoId: 3 },
    { link: 'https://authenticfeet.vteximg.com.br/arquivos/ids/220067-1000-1000/Saia-Nike-Skirt-Mesh-Feminina-Nike.jpg?v=636600967419370000' ,nome: 'Ryan Dahl', produtoId: 3 },
    { link: 'http://static.cloud-boxloja.com/lojas/jh4kf/produtos/c45c7e9c-6f14-4189-be19-ab6ea3532f15.jpg' ,nome: 'Ryan Dahl', produtoId: 4 },
    { link: 'https://pullzone-7a55.kxcdn.com/wp-content/uploads/2017/06/Vestido-Xadrez.jpg' ,nome: 'Ryan Dahl', produtoId: 4},
    { link: 'https://http2.mlstatic.com/moda-outono-inverno-vestido-feminino-moletom-com-ziper-D_NQ_NP_540525-MLB25444762947_032017-F.jpg' ,nome: 'Ryan Dahl', produtoId: 4}
  ]);
  //
  //
  await Tamanho.createEach([
    { nome: 'PP', numero: 1},
    { nome: 'P', numero: 2},
    { nome: 'M', numero: 3},
    { nome: 'G', numero: 4},
    { nome: 'GG', numero: 5}
  ]);

  await ProdutoTamanho.createEach([
    { produto: 1, tamanho: 1},
    { produto: 1, tamanho: 2},
    { produto: 1, tamanho: 4},
    { produto: 2, tamanho: 1},
    { produto: 2, tamanho: 3},
    { produto: 2, tamanho: 5},
    { produto: 3, tamanho: 1},
    { produto: 4, tamanho: 5},
    { produto: 4, tamanho: 2}
  ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};

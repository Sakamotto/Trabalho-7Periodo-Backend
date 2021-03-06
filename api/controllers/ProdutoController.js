/**
* ProdutosController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/
const http = require('http');
var parser = require('xml2js');
module.exports = {
  findAll: async function (req, res) {
    let paramFiltro = req.param('filtros');
    let filtros = {};
    let where = {}

    if (paramFiltro) {
      paramFiltro = JSON.parse(paramFiltro);
      // var qtdProdutos = await Produto.count();
      // var qtdPaginas = Math.ceil(qtdProdutos / (paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10));
      // filtros.limit = paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10;
      // filtros.skip = (paramFiltro.paginaAtual - 1) * paramFiltro.itensPorPagina;
      if (paramFiltro.nome) where.nome = { contains: paramFiltro.nome };
      // if (paramFiltro.categoriaId) filtros.categoriaId = paramFiltro.categoriaId;

      if (paramFiltro.categoriaId) where.id = paramFiltro.categoriaId;
      if (paramFiltro.precoMin) where.venda = { '>=': paramFiltro.precoMin };
      if (paramFiltro.precoMax) where.venda = { '<=': paramFiltro.precoMax };
    }

    // .populate('categoria').populate('imagens', { select: ['link']}).populate('tamanhos')
    Produto.find(filtros).populate('exemplarprodutos').populate('imagens').populate('categoria').where(where).exec((err, produtos) => {
      if (err) res.status(500).send({ error: 'Erro ao buscar produtos', erro: err });
      res.status(200).send(produtos);
    });
  },

  getExemplarCarrinho: async function (req, res) {
    let exemplarId = req.param('exemplarId');

    if (exemplarId) {
      try {
        var retorno = await ExemplarProduto.findOne({ id: exemplarId }).populate('produto').populate('itemcompra');
        let imagens = await Imagem.find({ produtoId: retorno.produto.id });
        retorno.produto.imagens = imagens;
        return res.json(retorno);
      } catch (err) {
        return res.status(500).send({ error: err });
      }
    } else {
      return res.status(500).send({ error: 'O id precisa ser informado' });
    }
  },

  getAll: async function (req, res) {
    let paramFiltro = req.param('filtros');
    let filtros = {};

    if (paramFiltro) {
      var qtdProdutos = await Produto.count();
      var qtdPaginas = Math.ceil(qtdProdutos / (paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10));
      filtros.limit = paramFiltro.itensPorPagina ? paramFiltro.itensPorPagina : 10;
      filtros.skip = (paramFiltro.paginaAtual - 1) * paramFiltro.itensPorPagina;
    }

    Produto.find(filtros).populate('categoria').exec((err, produtos) => {
      if (err) res.status(500).send({ error: 'Erro ao buscar produtos', erro: err });
      res.status(200).send({ produtos: produtos, filtros: filtros });
    });
  },

  create: async function (req, res) {
    let produto = req.param('produto');
    let listaImagens = [];
    let listaExemplares = [];

    for (let exemplar of produto.exemplarprodutos) {
      let novoExemplar = await ExemplarProduto.create(exemplar).fetch();
      listaExemplares.push(novoExemplar.id);
    }

    for (let imagem of produto.imagens) {
      let novaImagem = await Imagem.create({ link: imagem.link }).fetch();
      listaImagens.push(novaImagem.id);
    }

    // produto.quantidade = 90;
    produto.exemplarprodutos = listaExemplares;
    produto.imagens = listaImagens;

    if (!produto) {
      return res.status(500).send({ error: 'O produto não está preenchido' });
    }
    var produtoCriado = await Produto.create(produto).fetch();
    if (!produtoCriado) { return res.status(500).send({ error: 'Erro ao criar um novo produto' }) }
    return res.json(produtoCriado);
  },

  findOne: async function (req, res) {
    let id = req.param('id');
    if (id) {
      try {
        var retorno = await Produto.findOne({ id: id }).populate('exemplarprodutos').populate('imagens').populate('categoria');
        return res.json(retorno);
      } catch (err) {
        return res.status(500).send({ error: err });
      }
    } else {
      return res.status(500).send({ error: 'O id precisa ser informado' });
    }
  },

  update: async function (req, res) {
    let id = req.param('id');
    let updated = req.param('produto');

    for (let exemplar of updated.exemplarprodutos) {
      if (exemplar.id) {
        await ExemplarProduto.update({ id: exemplar.id }, exemplar).fetch();
        await Produto.addToCollection(updated.id, 'exemplarprodutos').members([exemplar.id]);
      } else {
        let novoExemplar = await ExemplarProduto.create(exemplar).fetch();
        await Produto.addToCollection(updated.id, 'exemplarprodutos').members([novoExemplar.id]);
      }
    }

    for (let imagem of updated.imagens) {
      if (imagem.id) {
        if (imagem.link) {
          await Imagem.update({ id: imagem.id }, imagem).fetch();
          await Produto.addToCollection(updated.id, 'imagens').members([imagem.id]);
        } else {
          await Imagem.destroy({ id: imagem.id }).fetch();
        }
      } else {
        console.log('Else');
        let novaImagem = await Imagem.create({ link: imagem.link }).fetch();
        await Produto.addToCollection(updated.id, 'imagens').members([novaImagem.id]);
        console.log('Else: ', novaImagem);
      }
    }
    delete updated.exemplarprodutos;
    delete updated.imagens;

    if (id) {
      if (updated.categoria) {
        updated.categoria = updated.categoria.id || updated.categoria;
      }
      var produtoAtualizado = await Produto.update({ id: id }, updated).fetch();
      return res.json(produtoAtualizado);
    } else {
      return res.status(500).send({ error: 'O id precisa ser informado' });
    }
  },

  calcularFrete: function (req, res) {
    let cep = req.param('cep').replace(".", "").replace("-", "");
    let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPreco?nCdEmpresa=&sDsSenha=&sCepOrigem=29055000&sCepDestino=' + cep + '&nVlPeso=5&nCdFormato=1&nVlComprimento=16&nVlAltura=5&nVlLargura=15&nVlDiametro=0&sCdMaoPropria=s&nVlValorDeclarado=200&sCdAvisoRecebimento=n&nCdServico=40010,41106&StrRetorno=xml';
    let output = '';
    http.get(url, resp => {
      resp.on('data', function (chunk) {
        output += chunk;
      });

      resp.on('end', function () {
        parser.parseString(output, (err, result) => {
          return res.status(200).send(result);
        });
      });
    });
  },

  delete: async function (req, res) {
    let id = req.param('id');
    if (id) {
      await ExemplarProduto.destroy({ where: { produtoId: id } }); // Testar isso ...
      var deletado = await Produto.destroy({ id: id }).fetch();
      return res.json({ mensagem: 'Produto deletada com sucesso', deletado });
    } else {
      return res.status(500).send({ error: 'O id precisa ser informado' });
    }
  }
};

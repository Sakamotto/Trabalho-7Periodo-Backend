/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // Produto
  'POST /produto': 'ProdutoController.create',
  'GET /produto': 'ProdutoController.findAll',
  'GET /produto/:id': 'ProdutoController.findOne',
  'PUT /produto/:id': 'ProdutoController.update',
  'DELETE /produto/:id': 'ProdutoController.delete',
  'POST /produto/carrinho': 'ProdutoController.getExemplarCarrinho',
  'GET /produto/calcularFrete': 'ProdutoController.calcularFrete',

  // Categoria
  'POST /categoria': 'CategoriaController.create',
  'GET /categoria': 'CategoriaController.findAll',
  'GET /categoria/:id': 'CategoriaController.findOne',
  'PUT /categoria/:id': 'CategoriaController.update',
  'DELETE /categoria/:id': 'CategoriaController.delete',

  // Cliente
  'POST /cliente': 'ClienteController.create',
  'GET /cliente': 'ClienteController.findAll',
  'GET /cliente/token': 'ClienteController.verifyToken',
  'POST /cliente/login': 'ClienteController.login',
  'PUT /cliente:id': 'ClienteController.update',

  // Fornecedor
  'POST /fornecedor': 'FornecedorController.create',
  'GET /fornecedor': 'FornecedorController.findAll',
  'GET /fornecedor/:id': 'FornecedorController.findOne',
  'PUT /fornecedor/:id': 'FornecedorController.update',
  'DELETE /fornecedor/:id': 'FornecedorController.delete',

  // Compra
  'POST /compra/finalizarCompra': 'Compra.finalizarCompra',
  'POST /compra/minhasCompras': 'Compra.getMinhasCompras'

};

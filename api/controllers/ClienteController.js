/**
 * ClienteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    findAll: function(req, res){
        Cliente.find({}).exec((err, clientes) => {
            if(err) res.status(500).send({error: 'Erro ao buscar clientes.', outro: err});
            res.status(200).send(clientes);
        });
    },
};


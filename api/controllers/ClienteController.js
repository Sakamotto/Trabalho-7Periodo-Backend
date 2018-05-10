/**
 * ClienteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    findAll: async function(req, res){
        try{
            var clientes = await Cliente.find({});
        }catch(err){
            return res.status(500).send({error: err});
        }
        return res.json(clientes);
    },

    create: async function(req, res){
        let cliente = req.param('cliente');
        
        var clienteCriado = await Cliente.create(cliente).fetch();
        if(!clienteCriado){
            return res.status(500).send({error: 'Erro ao criar uma novo cliente.'})
        }
        return res.json(clienteCriado);
    }
};
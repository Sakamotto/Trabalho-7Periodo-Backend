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
};


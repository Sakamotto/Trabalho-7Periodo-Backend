/**
 * ClienteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
    },

    login: async function(req, res) {
        let email = req.param('email');
        let senha = req.param('senha');

        if(senha && email){
            try{
                var user = await Cliente.findOne({email: email, senha: senha});
                if(!user){
                    return res.status(500).send({err: 'Usuário não encontrado'});
                }else{
                    var token = jwt.sign({user: user}, sails.config.session.secret,{
                        expiresIn: '10h'
                    });
                    return res.send({sucesso: true, token: token});
                }
            }catch(err){
                return res.status(500).send({err: err, erro: 'Catch aqui'});
            }
        }else{
            return res.status(500).send({err: 'Email e senha precisam ser preenchidos'});
        }
    }
};
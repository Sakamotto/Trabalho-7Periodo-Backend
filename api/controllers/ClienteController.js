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

    update: async function(req, res) {
        let id = req.param('id');
        console.log('UPDATE');
        let updated = req.param('cliente');
        console.log('-> ', updated)
        if(id){
            var clienteAtualizado = await Cliente.update({id: id}, updated).fetch();
            console.log('Passei');
            return res.json(clienteAtualizado);
        }else{
            return res.status(500).send({error: 'O id precisa ser informado'});
        }
    },

    create: async function(req, res){
        let cliente = req.param('cliente');
        
        var clienteCriado = await Cliente.create(cliente).fetch();
        if(!clienteCriado){
            return res.status(500).send({error: 'Erro ao criar uma novo cliente.'})
        }
        return res.json(clienteCriado);
    },

    verifyToken: function(req, res){
        var bearerHeader = req.headers["authorization"];
        var bearerToken = bearerHeader.split(" ")[1];
        if (bearerToken) {
            jwt.verify(bearerToken, sails.config.session.secret, function (err, decoded) {
                if (err) {
                    sails.log("verification error", err);
                    if (err.name === "TokenExpiredError"){
                        return res.json({sucesso: false, erro: err});
                        // return res.forbidden("Session timed out, please login again");                    
                    } else {
                        return res.json({sucesso: false, erro: err});
                    }
                }
      
                Cliente.find({where: {id: decoded.id}}).exec(function callback(error, user) {
                    if (error) return res.serverError({sucesso: false, erro: err});
                    if (!user) return res.serverError({sucesso: false, erro: "User not found"});
        
                    res.json({sucesso: true, mensagem: "Usuário autenticado"});
                    // next();
                });
          });
        }else{
            req.json({sucesso: false, erro: "Token inválido"});
        }
    },

    login: async function(req, res) {
        let email = req.param('email');
        let senha = req.param('senha');

        if(senha && email){
            try{
                var user = await Cliente.findOne({email: email, senha: senha});
                if(!user){
                    return res.json({err: 'Usuário não encontrado'});
                }else{
                    var token = jwt.sign({user: user}, sails.config.session.secret, {
                        expiresIn: '30m'
                    });
                    return res.send({sucesso: true, token: token, user: JSON.stringify(user)});
                }
            }catch(err){
                return res.json({err: err, erro: 'Catch aqui'});
            }
        }else{
            return res.json({err: 'Email e senha precisam ser preenchidos'});
        }
    },
};
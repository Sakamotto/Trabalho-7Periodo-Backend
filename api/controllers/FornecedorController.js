module.exports = {
    findAll: function(req, res){
        Fornecedor.find({}).exec((err, fornecedores) => {
            if(err) res.status(500).send({error: 'Erro ao buscar fornecedores'});
            res.status(200).send(fornecedores);
        });
    },

    create: async function(req, res){
        let fornecedor = req.param('fornecedor');
        if(!fornecedor){
            return res.status(500).send({error: 'O fornecedor não está preenchido'});
        }
        var fornecedorCriado = await Fornecedor.create(fornecedor).fetch();
        if(!fornecedorCriado){return res.status(500).send({error: 'Erro ao criar um novo fornecedor'})}
        return res.json(fornecedorCriado);
    },

    findOne: async function(req, res){
        let id = req.param('id');
        if(id){
            try{
                var retorno = await Fornecedor.findOne({id: id});
                return res.json(retorno);
            }catch(err){
                return res.status(500).send({error: err});
            }
        }else{
            return res.status(500).send({error: 'O id precisa ser informado'});
        }

    },

    update: async function(req, res) {
        let id = req.param('id');
        let updated = req.param('fornecedor');
        if(id){
            var fornecedorAtualizado = await Fornecedor.update({id: id}, updated).fetch();
            return res.json(fornecedorAtualizado);
        }else{
            return res.status(500).send({error: 'O id precisa ser informado'});
        }
    },

    delete: async function(req, res){
        let id = req.param('id');
        if(id){
            var deletado = await Fornecedor.destroy({id: id}).fetch();
            return res.json({mensagem: 'Produto deletada com sucesso', deletado});
        }else{
            return res.status(500).send({error: 'O id precisa ser informado'});
        }
    }
};

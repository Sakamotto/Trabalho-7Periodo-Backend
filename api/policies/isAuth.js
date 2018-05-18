var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];

        if (bearer[0] !== "Bearer") {
            return res.forbidden("Bearer not understood");
        }

        //verify if this token was from us or not
        jwt.verify(bearerToken, sails.config.session.secret, function (err, decoded) {
            if (err) {
                if (err.name === "TokenExpiredError"){
                    return res.json({sucesso: false, mensagem: "Session timed out, please login again"});
                } else {
                    return res.json({sucesso: false, mensagem: "Error authenticating, please login again"});
                }
            }
  
            Cliente.find({where: {id: decoded.id}}).exec(function callback(error, user) {
                if (error) return res.serverError(err);
                if (!user) return res.serverError("User not found");
    
                req.user = user;
                next();
            });
      });
  
    } else {
        return res.json({sucesso: false, mensagem: "No token provided"});
    }

}
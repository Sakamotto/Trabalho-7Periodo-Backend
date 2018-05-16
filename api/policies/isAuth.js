var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log('OOOOOOOOOOOPA: ', req.headers["authorization"]);

    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        console.log('Primeiro IF');

        if (bearer[0] !== "Bearer") {
            console.log('1');
            return res.forbidden("Bearer not understood");
        }

        //verify if this token was from us or not
        jwt.verify(bearerToken, sails.config.session.secret, function (err, decoded) {
            if (err) {
                console.log('1');
                sails.log("verification error", err);
                if (err.name === "TokenExpiredError"){
                    return res.forbidden("Session timed out, please login again");                    
                } else {
                    return res.forbidden("Error authenticating, please login again");
                }
            }

            console.log('3');
  
            Cliente.find({where: {id: decoded.id}}).exec(function callback(error, user) {
                if (error) return res.serverError(err);
                if (!user) return res.serverError("User not found");
    
                req.user = user;
                next();
            });
      });
  
    } else {
        console.log('ELSE');
        return res.forbidden("No token provided");
    }

}
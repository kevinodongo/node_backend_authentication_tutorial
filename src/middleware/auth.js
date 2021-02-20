var jwt = require('jsonwebtoken');
//var jwkToPem = require('jwk-to-pem');
//var jwk = { kty: 'EC', crv: 'P-256', x: '...', y: '...' },
//var pem = jwkToPem(jwk);
var pem;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
 
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
 
  jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;